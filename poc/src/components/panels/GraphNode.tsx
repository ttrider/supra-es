
import React from 'react';
import IGraphNode from "src/models/IGraphNode";
import ISurfaceController from 'src/models/ISurfaceController';
import { NodeAttached, NodeIcon, NodeInputCost, NodeProperties, NodeTitle } from '../Node';
import SufraceComponent from "../SurfaceComponent";
import { Classes } from '../SurfaceContext';

export default class GraphNode extends SufraceComponent<{ node: IGraphNode }> {



    public renderInContext(controller: ISurfaceController, classes: Classes) {

        const node = this.props.node;

        return (
            <g key={node.id} transform={node.transform} className={classes.node} >

                {/* <rect {...node.panelLayout.client} className="frame" onClick={section.select} /> */}

                <NodeIcon node={node} />
                <NodeTitle node={node} />
                <NodeProperties node={node} />
                <NodeAttached node={node} />
                <NodeInputCost node={node} />

            </g>

        );


    }
}
