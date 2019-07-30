
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
    title: string;
    nodeId: string;
    description?: string;
    absTime: number;
    relTime: number;
    cost: number;
    properties: ICanvasNodeProperty[];
    children: ICanvasNode[];
    help?: string;

    metrics: IMetricsItem[];
}

export interface IMetricsItem {
    title: string;
    values: string[]
}

export interface ICanvasNodeProperty {
    name: string;
    absTime: number;
    count: number;
    help?: string;
}









