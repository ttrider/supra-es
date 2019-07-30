import React from 'react';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import ISurfaceController from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';



export default class SurfaceGraphPanel extends SurfaceComponent<{ panel: GraphPanelLayout }>{


    public renderInContext(controller:ISurfaceController, classes: Classes){
        
        return (
        <g transform={this.props.panel.transform}>

            <rect width={this.props.panel.outerWidth} height={this.props.panel.outerHeight} fill="blue" stroke="red"/>

        </g>)

    }
}