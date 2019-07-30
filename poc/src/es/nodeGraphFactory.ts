import { getOrAdd } from '../helpers';
import *  as es from './model';
import { Node } from './node';


function createNodeGraph(profile: es.IProfile) {

    return new NodeGraph(profile);

}


export default createNodeGraph;



export class NodeGraph {

    private static applyCost(node: Node, totalTime: number) {

        node.cost = node.relTime / totalTime;

        for (const childNode of node.children) {
            NodeGraph.applyCost(childNode, totalTime);
        }
    }

    public dataNodes: es.IDataNode[] = [];
    public root: Node;

    constructor(profile: es.IProfile) {

        this.root = this.createProfileNode(profile);

        NodeGraph.applyCost(this.root, this.root.absTime);
    }




    private createProfileNode(profile: es.IProfile) {

        const node = new Node("Profile").setTitle("Profile");

        for (const shard of profile.shards) {

            const shId = es.parseShardId(shard.id);
            if (!shId) { throw new Error(`unparsable shard id: ${shard.id}`); }

            this.processData(shId);

            const sn = this.createShardNode(node, shard);

            node.absTime += sn.absTime;
        }

        return node;
    }

    private createShardNode(parent: Node, shard: es.IProfileShard) {


        const shardNode = new Node("Shard")
            .setTitle("Shard");

        parent.children.push(shardNode);


        const searchesNode = new Node("Searches")
            .setTitle("Searches");

        shardNode.children.push(searchesNode);

        // searches
        searchesNode.absTime = 0;
        for (const shardSearch of shard.searches) {
            const pan = this.createSearchNode(searchesNode, shardSearch).absTime;
            if (pan !== undefined) {
                searchesNode.absTime += pan;
            }
        }
        shardNode.absTime += searchesNode.absTime;

        // aggregations
        if (shard.aggregations) {

            const aggrsNode = new Node("Aggregations")
                .setTitle("Aggregations");
            shardNode.children.push(aggrsNode);

            this.createCanvasNodeTree(
                aggrsNode,
                shard.aggregations,
                i => this.createBreakdownNode(i,
                    [
                        "initialize",
                        "collect",
                        "build_aggregation",
                        "reduce"
                    ]));

            shardNode.absTime += aggrsNode.absTime;
        }
        return shardNode;
    }

    private createSearchNode(parent: Node, item: es.IProfileShardSearch) {

        const searchNode = new Node("Search")
            .setTitle("Search")
            .setMetrics(item.rewrite_time)

            ;
        parent.children.push(searchNode);

        this.createCanvasNodeTree<es.IProfileShardQuery>(
            searchNode,
            item.query,
            i => this.createBreakdownNode(i,
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


        this.createCanvasNodeTree(
            searchNode,
            item.collector,
            (i) => this.createCollectorNode(i));

        return searchNode;
    }

    private createCanvasNodeTree<T extends { children?: T[] }>(parent: Node, items: T[], factory: (item: T) => Node) {

        if (items !== undefined) {
            for (const item of items) {

                const node = this.createCanvasNode(parent, item, factory);

                parent.absTime += node.absTime;
            }
        }

        return parent;
    }

    private createCanvasNode<T extends { children?: T[] }>(parent: Node, item: T, factory: (item: T) => Node) {

        const newNode = factory(item);

        if (item.children) {
            for (const child of item.children) {
                const childNode = this.createCanvasNode(newNode, child, factory);
                newNode.relTime -= childNode.absTime;
            }
        }

        parent.children.push(newNode);

        return newNode;
    }

    private createBreakdownNode(item: es.IProfileItem, breakdownNames: string[]) {
        return new Node(item.type)
            .setTitle(item.type)
            .addDescription(item.description)
            .setMetrics(item.time_in_nanos)
            .setBreakdown(item.breakdown, breakdownNames)
            ;
    }


    private createCollectorNode(item: es.IProfileShardCollector) {

        return new Node(item.name)
            .setTitle(item.name)
            .addDescription(item.reason)
            .setMetrics(item.time_in_nanos)
            ;
    }

    private processData(shId: es.IShardId) {

        const dataNode = getOrAdd<es.IDataNode>(
            this.dataNodes,
            (v) => v.id === shId.nodeId,
            () => ({ id: shId.nodeId, indecies: [] }));

        const dataIndex = getOrAdd<es.IDataIndex>(
            dataNode.indecies,
            (v => v.id === shId.indexId),
            () => ({ id: shId.indexId, shards: [] })
        );

        getOrAdd<es.IDataShard>(
            dataIndex.shards,
            (v => v.id === shId.indexId),
            () => ({ id: shId.shardId, name: shId.name })
        );

        return shId;
    }



}


