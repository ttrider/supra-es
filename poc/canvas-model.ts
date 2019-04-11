import { IProfileItem, IProfileShardCollector, IProfileShardSearch, IProfileShardQuery, IProfileShard, IProfile } from "./es-profile";

export function createCanvas(profile: IProfile) {
    const canvas: ICanvas = {
        dataNodes: []
    };

    if (!profile || !profile.shards) return canvas;

    canvas.detailedRootNode = {
        type: "RootNode",
        nodeId: "detailedRootNode",
        properties: [],
        children: [],
        absTime: 0,
        relTime: 0,
        cost: 0,
    }

    canvas.combinedRootNode = {
        type: "RootNode",
        nodeId: "combinedRootNode",
        properties: [],
        children: [],
        absTime: 0,
        relTime: 0,
        cost: 0
    }

    for (const shard of profile.shards) {

        const shId = parseShardId(shard.id);
        if (!shId) throw new Error(`unparsable shard id: ${shard.id}`);

        processData(shId);

        const sn = shardCanvasNodeFactory(canvas.detailedRootNode, shard);

        canvas.detailedRootNode.absTime += sn.absTime;
    }

    applyCost(canvas.detailedRootNode, canvas.detailedRootNode.absTime);


    return canvas;

    function processData(shId: IShardId) {

        const dataNode = getOrAdd<IDataNode>(
            canvas.dataNodes,
            (v) => v.id === shId.nodeId,
            () => { return { id: shId.nodeId, indecies: [] } });

        const dataIndex = getOrAdd<IDataIndex>(
            dataNode.indecies,
            (v => v.id === shId.indexId),
            () => { return { id: shId.indexId, shards: [] } }
        );

        getOrAdd<IDataShard>(
            dataIndex.shards,
            (v => v.id === shId.indexId),
            () => { return { id: shId.shardId, name: shId.name } }
        );

        return shId;
    }

    function applyCost(node: ICanvasNode, totalTime: number) {

        node.cost = node.relTime / totalTime;

        for (const childNode of node.children) {
            applyCost(childNode, totalTime);
        }


    }
}

function createCanvasNodeTree<T extends { children?: T[] }>(parent: ICanvasNode, items: T[], factory: (parent: ICanvasNode, item: T) => ICanvasNode) {


    if (items !== undefined) {
        for (const item of items) {

            const node = createCanvasNode(parent, item, factory);

            parent.absTime += node.absTime;
        }
    }

    return parent;
}

function createCanvasNode<T extends { children?: T[] }>(parent: ICanvasNode, item: T, factory: (parent: ICanvasNode, item: T) => ICanvasNode) {

    const newNode = factory(parent, item);

    if (item.children) {
        for (const child of item.children) {
            const childNode = createCanvasNode(newNode, child, factory);
            newNode.relTime -= childNode.absTime;
        }
    }

    parent.children.push(newNode);

    return newNode;
}

function shardCanvasNodeFactory(parent: ICanvasNode, shard: IProfileShard) {

    const shId = parseShardId(shard.id);
    if (!shId) throw new Error(`unparsable shard id: ${shard.id}`);

    const shardNode: ICanvasNode = {
        type: "ShardNode",
        nodeId: parent.nodeId + "-shard-" + shId.name,
        properties: [],
        children: [],
        absTime: 0,
        relTime: 0
    };
    parent.children.push(shardNode);

    const sn = searchesCanvasNodeFactory(shardNode, shard);
    if (sn !== undefined) {
        shardNode.absTime += sn.absTime;
    }
    const an = aggregationsCanvasNodeFactory(shardNode, shard);
    if (an !== undefined) {
        shardNode.absTime += an.absTime;
    }

    return shardNode;
}

function collectorCanvasNodeFactory(parent: ICanvasNode, item: IProfileShardCollector) {
    return {
        nodeId: parent.nodeId + "-" + item.reason,
        type: item.name,
        description: item.reason,
        absTime: item.time_in_nanos,
        properties: [],
        children: [],
        help: nodeHelp["collector-" + item.reason],
        relTime: item.time_in_nanos
    } as ICanvasNode;
}

function breakdownCanvasNodeFactory(parent: ICanvasNode, item: IProfileItem, properties: string[]) {

    return {
        nodeId: parent.nodeId + "-" + item.description,
        type: item.type,
        description: item.description,
        absTime: item.time_in_nanos,
        properties: getBreakdownProperties(item.breakdown, properties),
        children: [],
        relTime: item.time_in_nanos
    } as ICanvasNode;

    function getBreakdownProperties(breakdown: { [name: string]: number }, properties: string[]) {

        const ret: ICanvasNodeProperty[] = [];

        for (const property of properties) {

            const propValue = breakdown[property];
            if (propValue !== undefined) {
                const propCount = breakdown[property + "_count"];
                const propHelp = nodeHelp["breakdown-" + property];
                ret.push(
                    {
                        name: property.replace(/_/gi, " "),
                        absTime: propValue,
                        count: propCount === undefined ? 0 : propCount,
                        help: propHelp
                    });
            }
        }
        return ret;
    }
}

function searchCanvasNodeFactory(parent: ICanvasNode, item: IProfileShardSearch) {

    const searchNode: ICanvasNode = {
        nodeId: parent.nodeId + "-search",
        type: "SearchNode",
        absTime: item.rewrite_time,
        properties: [],
        children: [],
        relTime: item.rewrite_time
    }

    parent.children.push(searchNode);

    createCanvasNodeTree<IProfileShardQuery>(
        searchNode,
        item.query,
        (p, i) => breakdownCanvasNodeFactory(p, i,
            [
                "create_weight",
                "build_scorer",
                "next_doc",
                "advance",
                "match",
                "score",
                "compute_max_score",
                "shallow_advance"
            ]));


    createCanvasNodeTree(
        searchNode,
        item.collector,
        (p, i) => collectorCanvasNodeFactory(p, i));

    return searchNode;
}
function searchesCanvasNodeFactory(parent: ICanvasNode, item: IProfileShard) {

    if (item.searches) {

        const newNode: ICanvasNode = {
            type: "SearchesNode",
            nodeId: parent.nodeId + "-searches",
            absTime: 0,
            properties: [],
            children: [],
            relTime: 0
        }
        parent.children.push(newNode);

        newNode.absTime = 0;
        for (const shardSearch of item.searches) {
            const pan = searchCanvasNodeFactory(newNode, shardSearch).absTime;
            if (pan !== undefined) {
                newNode.absTime += pan;
            }
        }

        return newNode;
    }
}

function aggregationsCanvasNodeFactory(parent: ICanvasNode, item: IProfileShard) {

    if (item.aggregations) {

        const aggrsNode: ICanvasNode = {
            type: "AggregationsNode",
            nodeId: parent.nodeId + "-aggrs",
            absTime: 0,
            properties: [],
            children: [],
            relTime: 0
        }
        parent.children.push(aggrsNode);

        createCanvasNodeTree(
            aggrsNode,
            item.aggregations,
            (p, i) => breakdownCanvasNodeFactory(p, i,
                [
                    "initialize",
                    "collect",
                    "build_aggregation",
                    "reduce"
                ]));

        return aggrsNode;
    }
}

function parseShardId(id: string) {
    const match = /\[([^\]]*)\]\[([^\]]*)\]\[([^\]]*)\]/gi.exec(id);

    if (match && match.length >= 4) {

        return {
            name: match[0],
            nodeId: match[1],
            indexId: match[2],
            shardId: match[3]
        } as IShardId;
    }
}

function getOrAdd<T>(array: T[], predicate: (value: T) => boolean, factory: () => T) {

    const existing = array.find(predicate);
    if (existing === undefined) {

        const value = factory();
        array.push(value);
        return value;
    }
    return existing;
}


const nodeHelp: { [name: string]: string } = {

    // queries
    "breakdown-create_weight": "A Query in Lucene must be capable of reuse across multiple IndexSearchers (think of it as the engine that executes a search against a specific Lucene Index). This puts Lucene in a tricky spot, since many queries need to accumulate temporary state/statistics associated with the index it is being used against, but the Query contract mandates that it must be immutable. To get around this, Lucene asks each query to generate a Weight object which acts as a temporary context object to hold state associated with this particular (IndexSearcher, Query) tuple. The weight metric shows how long this process takes",
    "breakdown-build_scorer": "This parameter shows how long it takes to build a Scorer for the query. A Scorer is the mechanism that iterates over matching documents and generates a score per-document (e.g. how well does \"foo\" match the document?). Note, this records the time required to generate the Scorer object, not actually score the documents. Some queries have faster or slower initialization of the Scorer, depending on optimizations, complexity, etc. This may also show timing associated with caching, if enabled and/or applicable for the query",
    "breakdown-next_doc": "The Lucene method next_doc returns Doc ID of the next document matching the query. This statistic shows the time it takes to determine which document is the next match, a process that varies considerably depending on the nature of the query. Next_doc is a specialized form of advance() which is more convenient for many queries in Lucene. It is equivalent to advance(docId() + 1)",
    "breakdown-advance": "advance is the \"lower level\" version of next_doc: it serves the same purpose of finding the next matching doc, but requires the calling query to perform extra tasks such as identifying and moving past skips, etc. However, not all queries can use next_doc, so advance is also timed for those queries. Conjunctions (e.g. must clauses in a boolean) are typical consumers of advance",
    "breakdown-match": "Some queries, such as phrase queries, match documents using a \"two-phase\" process. First, the document is \"approximately\" matched, and if it matches approximately, it is checked a second time with a more rigorous (and expensive) process. The second phase verification is what the matches statistic measures. For example, a phrase query first checks a document approximately by ensuring all terms in the phrase are present in the doc. If all the terms are present, it then executes the second phase verification to ensure the terms are in-order to form the phrase, which is relatively more expensive than just checking for presence of the terms. Because this two-phase process is only used by a handful of queries, the metric statistic will often be zero",
    "breakdown-score": "This records the time taken to score a particular document via its Scorer",

    //aggregations
    "breakdown-initialize": "This times how long it takes to create and initialise the aggregation before starting to collect documents.",
    "breakdown-collect": "This represents the cumulative time spent in the collect phase of the aggregation. This is where matching documents are passed to the aggregation and the state of the aggregator is updated based on the information contained in the documents.",
    "breakdown-build aggregation": "This represents the time spent creating the shard level results of the aggregation ready to pass back to the reducing node after the collection of documents is finished.",
    "breakdown-reduce": "This is not currently used and will always report 0. Currently aggregation profiling only times the shard level parts of the aggregation execution. Timing of the reduce phase will be added later.",

    // collectors
    "collector-search_sorted": "A collector that scores and sorts documents. This is the most common collector and will be seen in most simple searches",
    "collector-search_count": "A collector that only counts the number of documents that match the query, but does not fetch the source. This is seen when size: 0 is specified",
    "collector-search_terminate_after_count": "A collector that terminates search execution after n matching documents have been found. This is seen when the terminate_after_count query parameter has been specified",
    "collector-search_min_score": "A collector that only returns matching documents that have a score greater than n. This is seen when the top-level parameter min_score has been specified.",
    "collector-search_multi": "A collector that wraps several other collectors. This is seen when combinations of search, aggregations, global aggs, and post_filters are combined in a single search.",
    "collector-search_timeout": "A collector that halts execution after a specified period of time. This is seen when a timeout top-level parameter has been specified.",
    "collector-aggregation": "A collector that Elasticsearch uses to run aggregations against the query scope. A single aggregation collector is used to collect documents for all aggregations, so you will see a list of aggregations in the name rather.",
    "collector-global_aggregation": "A collector that executes an aggregation against the global query scope, rather than the specified query. Because the global scope is necessarily different from the executed query, it must execute its own match_all query (which you will see added to the Query section) to collect your entire dataset",
};



export interface IShardId {

    name: string;
    nodeId: string;
    indexId: string;
    shardId: string;

}

export interface ICanvas {
    [name: string]: any;


    dataNodes: IDataNode[];

    detailedRootNode?: ICanvasNode;
    combinedRootNode?: ICanvasNode;
}


export interface IDataNode {
    id: string;

    indecies: IDataIndex[];
}

export interface IDataIndex {
    id: string;

    shards: IDataShard[];
}

export interface IDataShard {
    id: string;

    name: string;
}


export interface ICanvasNode {
    type: string;
    nodeId: string;
    description?: string;
    absTime: number;
    relTime: number;
    cost: number;
    properties: ICanvasNodeProperty[];
    children: ICanvasNode[];
    help?: string;
}

export interface ICanvasNodeProperty {
    name: string;
    absTime: number;
    count: number;
    help?: string;
}