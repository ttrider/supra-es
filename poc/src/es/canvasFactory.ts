
import { propertiesBuilder } from 'src/controllers/layout/PropertiesLayout';
import SurfaceGraphNode from 'src/controllers/panels/GraphNode';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import { graphRootNodeBuilder } from 'src/controllers/panels/GraphRootNodeBuilder';
import StoragePanelLayout from 'src/controllers/panels/StoragePanelLayout';
import TextPanelLayout from 'src/controllers/panels/TextPanelLayout';
import { createSectionSet } from 'src/controllers/SectionSet';
import SurfaceView from "src/controllers/SurfaceView";
import { nsTimeToString } from '../helpers/formatter';
import { Node } from "./node";
import { NodeGraph } from "./nodeGraphFactory";

// function createSurfaceSection(nodeGraph: NodeGraph, surface?: s.Surface) {

//     surface = surface ? surface : new s.Surface();

//     if (nodeGraph === undefined) { return surface; }

//     const sectionGroup = surface.createSectionGroup();

//     sectionGroup.createSection(createSurfaceGraphRootNode(nodeGraph.root));


//     return surface;
// }

// function createSurfaceGraphRootNode(node: Node) {




//     const pb = propertiesBuilder()
//         .setHeader(
//             "Breakdown",
//             "Document Count",
//             "Duration"
//         )
//         .addRow(null,
//             node.breakdown.map(row => {
//                 return {
//                     columns: [row.name, row.count.toString(), nsTimeToString(row.absTime)],
//                     description: row.absTime + " ns",
//                     help: row.help
//                 }
//             }))
//         .addRow("OUTPUT", { columns: ["[Bmk1053]", "[Chk1054]"] })
//         .addRow("SORT", { columns: ["[IsBaseRow1055] ASC"] })
//         .addRow("SORT", { columns: ["[PrimaryKey0Value] DESC", "some column", "123"], description: "this is the description" })
//         .addRow("BUILD", { columns: ["Hash Keys:", "[PrimaryKey0Value]"] })
//         .addRow("PROBE", { columns: ["Hash Keys:", "[PrimaryKey0Value]"] })
//         .addRow("PROBE", { columns: ["Residual:", "[OBX_ExternalId] = [PrimaryKey0Value]"] })
//         .build();

//     const attachedNodesLayout = new AttachedNodesLayout().push(new SurfaceGraphNode(), new SurfaceGraphNode(), new SurfaceGraphNode(), new SurfaceGraphNode(), new SurfaceGraphNode());

//     const graphNode = graphRootNodeBuilder()
//         .setTitle(node.title)
//         .setSubtitle(node.description)
//         .setWeights(node.absTime, node.relTime)
//         .setProperties(pb)
//         .setAttachedNodes(attachedNodesLayout)
//         .setChildNodes(node.children.map(c => createSurfaceGraphNode(c)))
//         .build()
//         ;


//     return graphNode;

// }
// function createSurfaceGraphNode(node: Node) {

//     const graphNode = new SurfaceGraphNode();

//     graphNode.absoluteWeight = node.absTime;
//     graphNode.relativeWeight = node.relTime;

//     graphNode.title = node.title;
//     graphNode.subTitle = node.description;
//     graphNode.flags = ["flag 01", "flag 02", "flag 03"];

//     // metrics
//     graphNode.metrics.push({
//         title: "TOTAL DURATION:",
//         value: nsTimeToString(node.absTime),
//         description: node.absTime + " ns",
//         marked: false
//     });


//     if (node.absTime !== node.relTime) {

//         graphNode.metrics.push({
//             title: "THIS NODE ONLY:",
//             value: nsTimeToString(node.relTime),
//             description: node.relTime + " ns",
//             marked: false
//         });
//     }

//     graphNode.properties.headers.push(
//         "Breakdown",
//         "Document Count",
//         "Duration"
//     );

//     const group = graphNode.properties.createGroup();

//     for (const row of node.breakdown) {

//         group.rows.push({
//             columns: [row.name, row.count.toString(), nsTimeToString(row.absTime)],
//             description: row.absTime + " ns",
//             help: row.help
//         });
//     }

//     let outputPanel = graphNode.outputPanel.createGroup("OUTPUT");

//     outputPanel.addRow("[Bmk1053]");
//     outputPanel.addRow("[Chk1054]");

//     outputPanel = graphNode.outputPanel.createGroup("SORT");

//     outputPanel.addRow("[IsBaseRow1055] ASC");
//     outputPanel.addRow("[PrimaryKey0Value] DESC");


//     let inputPanel = graphNode.outputPanel.createGroup("BUILD");
//     inputPanel.addRow("Hash Keys:", "[PrimaryKey0Value]");
//     inputPanel = graphNode.outputPanel.createGroup("PROBE");
//     inputPanel.addRow("Hash Keys:", "[PrimaryKey0Value]");
//     inputPanel.addRow("Residual:", "[OBX_ExternalId] = [PrimaryKey0Value]");

//     for (const childNode of node.children) {

//         graphNode.children.push(createSurfaceGraphNode(childNode));

//     }

//     return graphNode;

// }

// export default createSurfaceSection;


export function createSurfaceView(nodeGraph: NodeGraph) {

    const view = new SurfaceView(nodeGraph);

    const graph = buildRootNode(nodeGraph);

    const graphPanel = new GraphPanelLayout("Plan", "left", [graph]);
    const storagePanel = new StoragePanelLayout(graphPanel);
    const statementPanel = new TextPanelLayout(storagePanel, "Statement");
    const indexPanel = new TextPanelLayout(statementPanel, "Index");

    view.panels.push(graphPanel, storagePanel, statementPanel,indexPanel);

    return view;
}

export function createSurfaceViewCompact(nodeGraph: NodeGraph) {

    const graph = buildRootNode(nodeGraph);

    const view = new SurfaceView(nodeGraph);

    const graphPanel = new GraphPanelLayout("Plan", "left", [graph]);
    const storagePanel = new StoragePanelLayout(graphPanel);
    const statementPanel = new TextPanelLayout(storagePanel, "Statement");

    view.panels.push(graphPanel, storagePanel, statementPanel);


    return view;
}


export function createSurfaceViewCombined(nodeGraph: NodeGraph) {

    const view = new SurfaceView(nodeGraph); 

    const graph = buildRootNode(nodeGraph);

    const graphPanel = new GraphPanelLayout("Plan", "left", [graph]);
    const storagePanel = new StoragePanelLayout(graphPanel);
    const indexPanel = new TextPanelLayout(storagePanel, "Index");

    view.panels.push(graphPanel, storagePanel, indexPanel);

    return view;
}

export function createSections(nodeGraph: NodeGraph) {

    const node = nodeGraph.root;

    const graphNode = graphRootNodeBuilder<NodeGraph>()
        .setTitle(node.title)
        .setSubtitle(node.description)
        .setWeights(node.absTime, node.relTime)
        .setProperties(buildNodeProperties(node))
        .setData(nodeGraph)
        .buildRoot()
        ;

    return createSectionSet<NodeGraph>([[graphNode, graphNode, graphNode], [graphNode, graphNode]]);
}

function buildRootNode(nodeGraph: NodeGraph) {
    const node = nodeGraph.root;
    return graphRootNodeBuilder<NodeGraph>()
        .setTitle(node.title)
        .setSubtitle(node.description)
        .setWeights(node.absTime, node.relTime)
        .setProperties(buildNodeProperties(node))
        .setChildNodes(node.children.map(item => buildNode(nodeGraph, item)))
        .setData(nodeGraph)
        .buildRoot()
        ;
}

function buildNode(nodeGraph: NodeGraph, node: Node): SurfaceGraphNode {
    return graphRootNodeBuilder<NodeGraph>()
        .setTitle(node.title)
        .setSubtitle(node.description)
        .setWeights(node.absTime, node.relTime)
        .setProperties(buildNodeProperties(node))
        .setChildNodes(node.children.map(item => buildNode(nodeGraph, item)))
        .setData(nodeGraph)
        .build()
        ;
}


function buildNodeProperties(node: Node) {
    return propertiesBuilder()
        .setHeader(
            "Breakdown",
            "Document Count",
            "Duration"
        )
        .addRow(null,
            node.breakdown.map(row => {
                return {
                    columns: [row.name, row.count.toString(), nsTimeToString(row.absTime)],
                    description: row.absTime + " ns",
                    help: row.help
                }
            }))
        .build();
}