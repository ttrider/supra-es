import { humanizeString } from '../helpers/formatter';


let lastNodeId = 1;

export declare type NodeType =
    "Profile" |
    "Shard" |
    "Searches" |
    "Search" |
    "Aggregations" |
    string
    ;

export class Node {

    public children: Node[] = [];
    public nodeId: string;
    public type: NodeType;
    public title: string;

    public relTime: number = 0;
    public absTime: number = 0;

    public cost: number = 0;

    public description: string[] = [];

    public breakdown: Array<{
        name: string;
        absTime: number;
        count: number;
        help?: string;
    }> = [];

    constructor(type: NodeType) {
        this.nodeId = `${lastNodeId++}`;
        this.type = type;
    }



    public setTitle(value: string) {

        this.title = humanizeString(value);

        return this;
    }

    public setMetrics(duration: number) {
        this.relTime =
            this.absTime =
            duration;

        return this;
    }

    public setBreakdown(breakdown: { [name: string]: number; }, breakdownNames: string[]) {

        for (const property of breakdownNames) {

            const propValue = breakdown[property];
            if (propValue !== undefined) {
                const propCount = breakdown[property + "_count"];
                const propHelp = nodeHelp["breakdown-" + property];
                this.breakdown.push(
                    {
                        absTime: propValue,
                        count: propCount === undefined ? 0 : propCount,
                        help: propHelp,
                        name: property.replace(/_/gi, " "),
                    });
            }
        }

        return this;
    }

    public addDescription(description?: string | string[]) {

        if (description !== undefined) {

            if (!Array.isArray(description)) {
                description = [description];
            }

            this.description = this.description.concat(description);
        }

        return this;
    }


}

const nodeHelp: { [name: string]: string } = {

    // queries
    "breakdown-advance": "advance is the \"lower level\" version of next_doc: it serves the same purpose of finding the next matching doc, but requires the calling query to perform extra tasks such as identifying and moving past skips, etc. However, not all queries can use next_doc, so advance is also timed for those queries. Conjunctions (e.g. must clauses in a boolean) are typical consumers of advance",
    "breakdown-build_scorer": "This parameter shows how long it takes to build a Scorer for the query. A Scorer is the mechanism that iterates over matching documents and generates a score per-document (e.g. how well does \"foo\" match the document?). Note, this records the time required to generate the Scorer object, not actually score the documents. Some queries have faster or slower initialization of the Scorer, depending on optimizations, complexity, etc. This may also show timing associated with caching, if enabled and/or applicable for the query",
    "breakdown-create_weight": "A Query in Lucene must be capable of reuse across multiple IndexSearchers (think of it as the engine that executes a search against a specific Lucene Index). This puts Lucene in a tricky spot, since many queries need to accumulate temporary state/statistics associated with the index it is being used against, but the Query contract mandates that it must be immutable. To get around this, Lucene asks each query to generate a Weight object which acts as a temporary context object to hold state associated with this particular (IndexSearcher, Query) tuple. The weight metric shows how long this process takes",
    "breakdown-match": "Some queries, such as phrase queries, match documents using a \"two-phase\" process. First, the document is \"approximately\" matched, and if it matches approximately, it is checked a second time with a more rigorous (and expensive) process. The second phase verification is what the matches statistic measures. For example, a phrase query first checks a document approximately by ensuring all terms in the phrase are present in the doc. If all the terms are present, it then executes the second phase verification to ensure the terms are in-order to form the phrase, which is relatively more expensive than just checking for presence of the terms. Because this two-phase process is only used by a handful of queries, the metric statistic will often be zero",
    "breakdown-next_doc": "The Lucene method next_doc returns Doc ID of the next document matching the query. This statistic shows the time it takes to determine which document is the next match, a process that varies considerably depending on the nature of the query. Next_doc is a specialized form of advance() which is more convenient for many queries in Lucene. It is equivalent to advance(docId() + 1)",
    "breakdown-score": "This records the time taken to score a particular document via its Scorer",

    // aggregations
    "breakdown-build aggregation": "This represents the time spent creating the shard level results of the aggregation ready to pass back to the reducing node after the collection of documents is finished.",
    "breakdown-collect": "This represents the cumulative time spent in the collect phase of the aggregation. This is where matching documents are passed to the aggregation and the state of the aggregator is updated based on the information contained in the documents.",
    "breakdown-initialize": "This times how long it takes to create and initialise the aggregation before starting to collect documents.",
    "breakdown-reduce": "This is not currently used and will always report 0. Currently aggregation profiling only times the shard level parts of the aggregation execution. Timing of the reduce phase will be added later.",

    // collectors
    "collector-aggregation": "A collector that Elasticsearch uses to run aggregations against the query scope. A single aggregation collector is used to collect documents for all aggregations, so you will see a list of aggregations in the name rather.",
    "collector-global_aggregation": "A collector that executes an aggregation against the global query scope, rather than the specified query. Because the global scope is necessarily different from the executed query, it must execute its own match_all query (which you will see added to the Query section) to collect your entire dataset",
    "collector-search_count": "A collector that only counts the number of documents that match the query, but does not fetch the source. This is seen when size: 0 is specified",
    "collector-search_min_score": "A collector that only returns matching documents that have a score greater than n. This is seen when the top-level parameter min_score has been specified.",
    "collector-search_multi": "A collector that wraps several other collectors. This is seen when combinations of search, aggregations, global aggs, and post_filters are combined in a single search.",
    "collector-search_sorted": "A collector that scores and sorts documents. This is the most common collector and will be seen in most simple searches",
    "collector-search_terminate_after_count": "A collector that terminates search execution after n matching documents have been found. This is seen when the terminate_after_count query parameter has been specified",
    "collector-search_timeout": "A collector that halts execution after a specified period of time. This is seen when a timeout top-level parameter has been specified.",
};