import StoragePanelLayout from 'src/controllers/panels/StoragePanelLayout';
import ISurfaceController from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';

import React from 'react';
import { Classes } from '../SurfaceContext';



export default class SurfaceStoragePanel extends SurfaceComponent<{ panel: StoragePanelLayout }>{
    public renderInContext(controller:ISurfaceController, classes: Classes){
        
        return (
        <g transform={this.props.panel.transform}>

            <rect width={this.props.panel.outerWidth} height={this.props.panel.outerHeight} fill="green" stroke="yellow"/>

        </g>)

    }
}