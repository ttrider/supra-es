import { propertiesBuilder } from 'src/controllers/layout/PropertiesLayout';
import SurfaceGraphNode from 'src/controllers/panels/GraphNode';
import { graphRootNodeBuilder } from 'src/controllers/panels/GraphNodeBuilder';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import StoragePanelLayout from 'src/controllers/panels/StoragePanelLayout';
import TextPanelLayout from 'src/controllers/panels/TextPanelLayout';
import SectionSet, { createSectionSet } from 'src/controllers/SectionSet';
import SurfaceView from 'src/controllers/SurfaceView';
import IInputCost from 'src/models/IInputCost';
import { Plan, PlanNode, PlanStatement } from 'supra-sqlplan';
import { Metrics } from 'supra-sqlplan/lib/metrics';

export function createSections(plan: Plan): SectionSet<PlanStatement> {

    const sections = plan.batches.map(batch => {

        return batch.statements.map(statement => {

            return graphRootNodeBuilder<PlanStatement>()
                // .setTitle(statement.id)
                .setSubtitle(statement.statementText)
                .setWeights(statement.relativeStatementCost, statement.relativeStatementCost)
                .setProperties(buildProperties(statement.root ? statement.root.metrics : undefined))
                .setChildrenCosts(buildChildrenCost(statement))
                .setData(statement)
                .buildRoot();
        });
    })

    return createSectionSet<PlanStatement>(sections);


    function buildChildrenCost(statement: PlanStatement) {

        if (!statement) { return; }
        if (!statement.root) { return; }

        return statement.root.children.map<IInputCost>(child => {

            return {
                id: child.nodeId.toString(),
                cost: child.metrics.absSubtreeCost
            };
        });
    }
}

export function createDefaultView(plan: Plan, selected: PlanStatement[]) {

    const view = new SurfaceView(plan);

    const nodeSet = selected.reduce<Array<SurfaceGraphNode<PlanNode>>>((nodes, statement) => {

        if (statement && statement.root) {
            // we skip the statement node
            nodes.push(...statement.root.children.map(c => buildNode(c)));
        }
        return nodes;
    }, []);

    return view.addPanel(
        new GraphPanelLayout("Plan", "left", nodeSet),
        new StoragePanelLayout(),
        new TextPanelLayout("Statement"),
        new TextPanelLayout("Index"));
}

function buildNode(node: PlanNode): SurfaceGraphNode<PlanNode> {


    let title: string | undefined;
    const subtitle: string[] = [];

    for (let index = 0; index < node.nameSet.length; index++) {
        let name = node.nameSet[index];

        if (typeof name === "function") {
            name = name();
        }

        if (index) {
            subtitle.push(name);
        } else {
            title = name;
        }
    }

    return graphRootNodeBuilder<PlanNode>()
        .setTitle(title)
        .setSubtitle(subtitle)
        .setWeights(node.metrics.absCost, node.metrics.relCost)
        .setProperties(buildProperties(node.metrics))
        .setData(node)
        .setChildNodes(node.children.map(n => buildNode(n)))
        .build();
}

function buildProperties(metrics?: Metrics) {

    const builder = propertiesBuilder();

    if (metrics) {

        let index = 0;
        const m = metrics.metrics;

        builder.setHeader(m[index]);
        index++;

        let group: string | null = null;

        for (; index < m.length; index++) {

            const item = m[index];
            if (item.length === 1) {
                group = item[0];
            } else {
                builder.addRow(group, { columns: item });
            }
        }
    }

    return builder.build();
}