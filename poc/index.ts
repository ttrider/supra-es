import fs from "fs";
import util from "util";
import es from "elasticsearch";
import { CANCELLED } from "dns";

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
        children: []
    }

    canvas.combinedRootNode = {
        type: "RootNode",
        nodeId: "combinedRootNode",
        children: []
    }

    for (const shard of profile.shards) {

        const shId = processData(shard);

        const shardNode: ICanvasNode = {
            type: "ShardNode",
            nodeId: shId.name,
            children: []
        }
        canvas.detailedRootNode.children.push(shardNode);

        if (shard.searches) {
            for (const shardSearch of shard.searches) {
                processSearch(shId, shardSearch);
            }
        }

        if (shard.aggregations) {

            const aggrsNode: ICanvasNode = {
                type: "AggregationsNode",
                nodeId: shId.name + "-Aggrs",
                children: []
            }
            shardNode.children.push(aggrsNode);

            for (const shardAggr of shard.aggregations) {
                processAggregation(aggrsNode, shardAggr);
            }
        }
    }


    return canvas;



    function processSearch(shid: IShardId, item: IESProfileShardSearch) {

    }
    function processAggregation(parent: ICanvasNode, item: IESProfileShardAggregation) {

        const aggrNode: ICanvasNode = {
            nodeId: parent.nodeId + "-" + item.description,
            type: item.type,
            description: item.description,
            absTime: item.time_in_nanos,
            children: []
        }

        if (item.children) {
            for (const child of item.children) {
                processAggregation(aggrNode, child);
            }
        }

        if (aggrNode.absTime !== undefined) {
            parent.absTime = parent.absTime === undefined ? aggrNode.absTime : parent.absTime + aggrNode.absTime;
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

}

interface IESProfileShardAggregation {
    type: string;
    description: string;
    time_in_nanos: number;

    breakdown: {
        "reduce": number,
        "build_aggregation": number,
        "build_aggregation_count": number,
        "initialize": number,
        "initialize_count": number,
        "reduce_count": number,
        "collect": number,
        "collect_count": number
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




    children: ICanvasNode[];
}