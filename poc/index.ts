import fs from "fs";
import util from "util";


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


console.info("processing....");

run().then(() => console.info("Done")).catch(e => console.error(e));


async function run() {

    const profile00 = await readJson<IESResponse>("data/example.json");

    if (profile00.profile) {
        const data00 = processProfile(profile00.profile);

        await writeFile("data/example.canvas.json", JSON.stringify(data00, null, 2));

    }

    return 0;
}

async function readJson<T>(filePath: string) {

    const buffer = await readFile(filePath);
    return JSON.parse(buffer.toString()) as T;
}

function processProfile(profile: IESProfile) {
    const canvas: ICanvas = {
        dataNodes: []
    };

    if (!profile || !profile.shards) return canvas;

    canvas.detailedRootNode = {
        type: "RootNode",
        nodeId: "detailedRootNode",
        properties: [],
        children: []
    }

    canvas.combinedRootNode = {
        type: "RootNode",
        nodeId: "combinedRootNode",
        properties: [],
        children: []
    }

    for (const shard of profile.shards) {

        const shId = processData(shard);

        const shardNode: ICanvasNode = {
            type: "ShardNode",
            nodeId: shId.name,
            properties: [],
            children: []
        }
        canvas.detailedRootNode.children.push(shardNode);

        if (shard.searches) {

            const searchesNode: ICanvasNode = {
                type: "SearchesNode",
                nodeId: shId.name + "-searches",
                properties: [],
                children: []
            }
            shardNode.children.push(searchesNode);

            searchesNode.absTime = 0;
            for (const shardSearch of shard.searches) {
                const pan = processSearch(searchesNode, shardSearch).absTime;
                if (pan !== undefined) {
                    searchesNode.absTime += pan;
                }
            }
        }

        if (shard.aggregations) {

            const aggrsNode: ICanvasNode = {
                type: "AggregationsNode",
                nodeId: shId.name + "-aggrs",
                absTime: 0,
                properties: [],
                children: []
            }
            shardNode.children.push(aggrsNode);

            aggrsNode.absTime = 0;
            for (const shardAggr of shard.aggregations) {
                const pan = processAggregation(aggrsNode, shardAggr).absTime;
                if (pan !== undefined) {
                    aggrsNode.absTime += pan;
                }
            }
        }
    }


    return canvas;



    function processSearch(parent: ICanvasNode, item: IESProfileShardSearch) {
        const searchNode: ICanvasNode = {
            nodeId: parent.nodeId + "-search",
            type: "SearchNode",
            absTime: item.rewrite_time,
            properties: [],
            children: []
        }

        if (item.query !== undefined) {
            for (const query of item.query) {
                const pan = processQuery(searchNode, query).absTime;
                if (pan !== undefined) {

                    searchNode.absTime = searchNode.absTime === undefined ? pan : searchNode.absTime + pan;
                }
            }
        }

        // if (item.collector !== undefined) {
        //     for (const collector of item.collector) {
        //         const pan = processCollector(searchNode, collector).absTime;
        //         if (pan !== undefined) {
        //             searchNode.absTime = searchNode.absTime === undefined ? pan : searchNode.absTime + pan;
        //         }
        //     }
        // }

        parent.children.push(searchNode);

        return searchNode;
    }
    function processQuery(parent: ICanvasNode, item: IESProfileShardQuery) {
        const newNode: ICanvasNode = {
            nodeId: parent.nodeId + "-" + item.description,
            type: item.type,
            description: item.description,
            absTime: item.time_in_nanos,
            properties: [],
            children: []
        }

        newNode.properties = getBreakdownProperties(item.breakdown,
            {
                name: "create_weight",
                help: "A Query in Lucene must be capable of reuse across multiple IndexSearchers (think of it as the engine that executes a search against a specific Lucene Index). This puts Lucene in a tricky spot, since many queries need to accumulate temporary state/statistics associated with the index it is being used against, but the Query contract mandates that it must be immutable. To get around this, Lucene asks each query to generate a Weight object which acts as a temporary context object to hold state associated with this particular (IndexSearcher, Query) tuple. The weight metric shows how long this process takes"
            },
            {
                name: "build_scorer",
                help: "This parameter shows how long it takes to build a Scorer for the query. A Scorer is the mechanism that iterates over matching documents and generates a score per-document (e.g. how well does \"foo\" match the document?). Note, this records the time required to generate the Scorer object, not actually score the documents. Some queries have faster or slower initialization of the Scorer, depending on optimizations, complexity, etc. This may also show timing associated with caching, if enabled and/or applicable for the query"
            },
            {
                name: "next_doc",
                help: "The Lucene method next_doc returns Doc ID of the next document matching the query. This statistic shows the time it takes to determine which document is the next match, a process that varies considerably depending on the nature of the query. Next_doc is a specialized form of advance() which is more convenient for many queries in Lucene. It is equivalent to advance(docId() + 1)"
            }
            , {
                name: "advance",
                help: "advance is the \"lower level\" version of next_doc: it serves the same purpose of finding the next matching doc, but requires the calling query to perform extra tasks such as identifying and moving past skips, etc. However, not all queries can use next_doc, so advance is also timed for those queries. Conjunctions (e.g. must clauses in a boolean) are typical consumers of advance"
            }
            , {
                name: "match",
                help: "Some queries, such as phrase queries, match documents using a \"two-phase\" process. First, the document is \"approximately\" matched, and if it matches approximately, it is checked a second time with a more rigorous (and expensive) process. The second phase verification is what the matches statistic measures. For example, a phrase query first checks a document approximately by ensuring all terms in the phrase are present in the doc. If all the terms are present, it then executes the second phase verification to ensure the terms are in-order to form the phrase, which is relatively more expensive than just checking for presence of the terms. Because this two-phase process is only used by a handful of queries, the metric statistic will often be zero"
            }
            , {
                name: "score",
                help: "This records the time taken to score a particular document via its Scorer"
            },
            {
                name: "compute_max_score"
            }
            ,
            {
                name: "shallow_advance"
            }
        );

        if (item.children) {
            for (const child of item.children) {
                processQuery(newNode, child);
            }
        }

        parent.children.push(newNode);

        return newNode;

    }

    function processCollector(parent: ICanvasNode, item: IESProfileShardCollector) {

    }



    function processAggregation(parent: ICanvasNode, item: IESProfileShardAggregation) {

        const aggrNode: ICanvasNode = {
            nodeId: parent.nodeId + "-" + item.description,
            type: item.type,
            description: item.description,
            absTime: item.time_in_nanos,
            properties: [{
                name: "initialize",
                time_in_nanos: item.breakdown.initialize,
                count: item.breakdown.initialize_count,
                help: "This times how long it takes to create and initialise the aggregation before starting to collect documents."
            },
            {
                name: "collect",
                time_in_nanos: item.breakdown.collect,
                count: item.breakdown.collect_count,
                help: "This represents the cumulative time spent in the collect phase of the aggregation. This is where matching documents are passed to the aggregation and the state of the aggregator is updated based on the information contained in the documents."
            },
            {
                name: "build aggregation",
                time_in_nanos: item.breakdown.build_aggregation,
                count: item.breakdown.build_aggregation_count,
                help: "This represents the time spent creating the shard level results of the aggregation ready to pass back to the reducing node after the collection of documents is finished."
            }
                // ,{
                //     name: "reduce",
                //     time_in_nanos: item.breakdown.reduce,
                //     count: item.breakdown.reduce_count,
                //     help: "This is not currently used and will always report 0. Currently aggregation profiling only times the shard level parts of the aggregation execution. Timing of the reduce phase will be added later."
                // }
            ],
            children: []
        }

        if (item.children) {
            for (const child of item.children) {
                processAggregation(aggrNode, child);
            }
        }

        parent.children.push(aggrNode);

        return aggrNode;
    }
    function processData(shard: IESProfileShard) {
        const shId = parseShardId(shard.id);
        if (!shId) throw new Error(`unparsable shard id: ${shard.id}`);

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

    function getBreakdownProperties(breakdown: { [name: string]: number },
        ...properties: { name: string, help?: string }[]) {

        const ret: ICanvasNodeProperty[] = [];

        for (const property of properties) {

            const propValue = breakdown[property.name];
            if (propValue !== undefined) {
                const propCount = breakdown[property.name + "_count"];
                ret.push(
                    {
                        name: property.name.replace(/_/gi, " "),
                        time_in_nanos: propValue,
                        count: propCount === undefined ? 0 : propCount,
                        help: property.help
                    });
            }
        }
        return ret;
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
}


interface IESResponse {

    profile?: IESProfile;
}

interface IESProfile {

    shards: IESProfileShard[];
}


interface IESProfileShard {

    id: string;

    searches: IESProfileShardSearch[];
    aggregations: IESProfileShardAggregation[];


    [name: string]: any;
}

interface IESProfileShardSearch {

    query: IESProfileShardQuery[];

    collector: IESProfileShardCollector[];

    rewrite_time: number;
}

interface IESProfileShardQuery {
    type: string;
    description: string;
    time_in_nanos: number;

    breakdown: {
        match: number;
        match_count: number;
        create_weight: number;
        create_weight_count: number;
        next_doc: number;
        next_doc_count: number;
        score: number;
        score_count: number;
        build_scorer: number;
        build_scorer_count: number;
        advance: number;
        advance_count: number;
        compute_max_score: number;
        compute_max_score_count: number;
        shallow_advance: number;
        shallow_advance_count: number;
    };
    children?: IESProfileShardQuery[];
}

interface IESProfileShardCollector {
    name: string;
    reason: string;
    time_in_nanos: number;

    children?: IESProfileShardCollector[];
}

interface IESProfileShardAggregation {
    type: string;
    description: string;
    time_in_nanos: number;

    breakdown: {
        build_aggregation: number;
        build_aggregation_count: number;
        initialize: number;
        initialize_count: number;
        reduce: number;
        reduce_count: number;
        collect: number;
        collect_count: number;
    },
    children?: IESProfileShardAggregation[]
}

interface IShardId {

    name: string;
    nodeId: string;
    indexId: string;
    shardId: string;

}

interface ICanvas {
    [name: string]: any;


    dataNodes: IDataNode[];

    detailedRootNode?: ICanvasNode;
    combinedRootNode?: ICanvasNode;
}


interface IDataNode {
    id: string;

    indecies: IDataIndex[];
}

interface IDataIndex {
    id: string;

    shards: IDataShard[];
}

interface IDataShard {
    id: string;

    name: string;
}


interface ICanvasNode {
    type: string;
    nodeId: string;

    description?: string;
    absTime?: number;


    properties: ICanvasNodeProperty[];


    children: ICanvasNode[];
}

interface ICanvasNodeProperty {
    name: string;
    time_in_nanos: number;
    count: number;
    help?: string;
}