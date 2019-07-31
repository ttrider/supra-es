import { propertiesBuilder } from 'src/controllers/layout/PropertiesLayout';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import { graphRootNodeBuilder } from 'src/controllers/panels/GraphRootNodeBuilder';
import StoragePanelLayout from 'src/controllers/panels/StoragePanelLayout';
import TextPanelLayout from 'src/controllers/panels/TextPanelLayout';
import SectionSet, { createSectionSet } from 'src/controllers/SectionSet';
import SurfaceView from 'src/controllers/SurfaceView';
import { Plan, PlanStatement } from 'supra-sqlplan';
import { Metrics } from 'supra-sqlplan/lib/metrics';

export function createSections(plan: Plan): SectionSet<PlanStatement> {

    const sections = plan.batches.map(batch => {

        return batch.statements.map(statement => {

            return graphRootNodeBuilder<PlanStatement>()
                .setTitle(statement.id)
                .setSubtitle(statement.statementText)
                .setWeights(statement.relativeStatementCost, statement.relativeStatementCost)
                .setProperties(buildProperties(statement.root ? statement.root.metrics : undefined))
                .setData(statement)
                .buildRoot();
        });
    })

    return createSectionSet<PlanStatement>(sections);
}

export function createDefaultView(plan: Plan) {

    const view = new SurfaceView(plan);


    const graphPanel = new GraphPanelLayout("Plan", "left", undefined);
    const storagePanel = new StoragePanelLayout(graphPanel);
    const statementPanel = new TextPanelLayout(storagePanel, "Statement");
    const indexPanel = new TextPanelLayout(statementPanel, "Index");

    view.panels.push(graphPanel, storagePanel, statementPanel, indexPanel);

    return view;


}

// function buildNode(node:PlanNode){

// }

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