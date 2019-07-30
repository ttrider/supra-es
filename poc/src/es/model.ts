export interface IResponse {

    profile?: IProfile;
}

export interface IProfile {

    shards: IProfileShard[];
}


export interface IProfileShard {

    id: string;

    searches: IProfileShardSearch[];
    aggregations: IESProfileShardAggregation[];


    [name: string]: any;
}

export interface IProfileShardSearch {

    query: IProfileShardQuery[];

    collector: IProfileShardCollector[];

    rewrite_time: number;
}

export interface IProfileItem {
    type: string;
    description: string;
    time_in_nanos: number;

    breakdown: { [name: string]: number };

    children?: IProfileItem[];
}

export interface IProfileShardQuery {
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
    children?: IProfileShardQuery[];
}

export interface IProfileShardCollector {
    name: string;
    reason: string;
    time_in_nanos: number;

    children?: IProfileShardCollector[];
}

export interface IESProfileShardAggregation {
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

export interface IShardId {

    name: string;
    nodeId: string;
    indexId: string;
    shardId: string;

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

export function parseShardId(id: string) {
    const match = /\[([^\]]*)\]\[([^\]]*)\]\[([^\]]*)\]/gi.exec(id);

    if (match && match.length >= 4) {

        return {
            indexId: match[2],
            name: match[0],
            nodeId: match[1],
            shardId: match[3],
        } as IShardId;
    }
    return;
}