import React from 'react';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import IGraphNode from "src/models/IGraphNode";
import { SurfaceContext, SurfaceContextProvider } from './SurfaceContext';

export function NodeAttached(props: { node: IGraphNode }) {

    const attachedNodes = props.node.attachedNodesLayout;

    if (attachedNodes && attachedNodes.nodes.length > 0) {
        const attached = attachedNodes.nodes.map((n, i) => (<rect {...n.client} key={i} />));

        return (
            <SurfaceContext.Consumer>
                {({ classes }) => (
                    <g transform={`translate(${attachedNodes.outerLeft},0)`
                    } className={classes.attachedNodes} >
                        {attached}
                        <line x1={attachedNodes.width} x2={attachedNodes.width} y1={attachedNodes.outerTop} y2={attachedNodes.outerBottom} />
                    </g >)}

            </SurfaceContext.Consumer>
        );
    }
    return <g />;
}
export function NodeIcon(props: { node: IGraphNode }) {

    return (
        <rect {...props.node.iconLayout.client} stroke="blue" strokeWidth="1" fill="whitesmoke" />
    );
}

export function NodeProperties(props: { node: IGraphNode }) {

    const node = props.node;

    return (
        <SurfaceContext.Consumer>
            {({ classes }) => (
                <>
                    <text {...node.propertiesTitle.textClient} className={classes.nodePropertiesTitle} onClick={node.toggleProperties}>Properties</text>
                    {(node.propertiesExpanded ? <Properties properties={node.properties} /> : undefined)}
                </>
            )}
        </SurfaceContext.Consumer>
    );
}

export function NodeInputCost(props: { node: IGraphNode }) {

    const inputCostLayout = props.node.inputCostLayout;

    return (
        <SurfaceContext.Consumer>
            {({ classes }) => (
                <g transform={inputCostLayout.transform} className={classes.nodeInputCostPanel}>
                    {inputCostLayout.connectors.map(item => <text key={item.id} {...item.textClient} className={classes.nodeInputCost} />)}
                </g>
            )}
        </SurfaceContext.Consumer>
    );
}

export function Properties(props: { properties: PropertiesLayout }) {

    const properties = props.properties;
    const headers = properties.headers;
    const groups = properties.groups;


    return (
        <SurfaceContext.Consumer>{render}</SurfaceContext.Consumer>
    );

    function render(context: SurfaceContextProvider) {

        return (
            <g transform={`translate(${properties.clientLeft}, ${properties.clientTop})`}>
                {headers.map((header) => <text key={"header-" + header.value} {...header.textClient} className={context.classes.nodePropertiesHeader} />)}
                {groups.map((group, index) =>
                    (<g key={"group-" + index}>

                        {group.title ? (<text {...group.title.textClient} className={context.classes.nodePropertiesGroupTitle} />) : undefined}

                        {group.rows.map((row, ri) => (

                            <g key={`row-${index}${ri}`} >

                                <rect {...row.rowLayout.client} className={context.classes.nodePropertiesBack} />

                                {row.columns.map((c, ci) => {

                                    return <text key={`row-${index}${ri}${ci}`}{...c.textClient} className={context.classes.nodePropertiesValue} />;
                                })}

                                {row.description ? <text {...row.description.textClient} className={context.classes.nodePropertiesValue} /> : undefined}

                            </g>

                        )
                        )}
                    </g>))
                }
            </g>
        );
    }
}






