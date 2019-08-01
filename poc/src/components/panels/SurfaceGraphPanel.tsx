import React from 'react';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import ISurfaceController from 'src/models/ISurfaceController';
import { NodeAttached, NodeIcon, NodeInputCost, NodeProperties, NodeTitle } from '../Node';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';



export default class SurfaceGraphPanel extends SurfaceComponent<{ panel: GraphPanelLayout }>{


    public renderInContext(controller: ISurfaceController, classes: Classes) {

        return (
            <g transform={this.props.panel.transform} >

                <rect width={this.props.panel.outerWidth} height={this.props.panel.outerHeight} fill="none" stroke="red" />

                {Object.values(this.props.panel.nodeLayouts).map(node => {

                    return (
                        <g key={node.id + "-node"} transform={node.transform} className={classes.node}>
                            <rect {...node.panelLayout.client} className={classes.nodeBorder} />

                            <NodeIcon node={node} />
                            <NodeTitle node={node} />
                            <NodeProperties node={node} />
                            <NodeAttached node={node} />
                            <NodeInputCost node={node} />

                        </g>
                    );

                })}

            </g>)

    }
}