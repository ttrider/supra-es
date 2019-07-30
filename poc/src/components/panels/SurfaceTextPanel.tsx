import React from 'react';
import TextPanelLayout from 'src/controllers/panels/TextPanelLayout';
import ISurfaceController from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';


export default class SurfaceTextPanel extends SurfaceComponent<{ panel: TextPanelLayout }>{
    public renderInContext(controller:ISurfaceController, classes: Classes){
        
        return (
        <g transform={this.props.panel.transform}>

            <rect width={this.props.panel.outerWidth} height={this.props.panel.outerHeight} fill="blue" stroke="green"/>

        </g>)

    }
}