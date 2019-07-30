import React from 'react';

import PanelTitleLayout from 'src/controllers/panels/PanelTitleLayout';
import ISurfaceController from 'src/models/ISurfaceController';
import SurfaceComponent from './SurfaceComponent';
import { Classes } from './SurfaceContext';

export default class SurfacePanelTitle extends SurfaceComponent<{ panelContext: PanelTitleLayout }> {


    public renderInContext(controller: ISurfaceController, classes: Classes) {

        const item = this.props.panelContext;

        return (
            <g key={item.value} className={classes.panelTitle}>

                <g>
                    <text {...item.textClient}>{item.value}</text>
                </g>

            </g>
            // <g key={item} transform={`translate(${item.panel.x}, ${item.top})`}>
            //     <rect x="0" y="0" width={item.width} height={item.height} stroke="black" strokeWidth="3" fill="none" />

            //     <g key={item.key} transform={`translate(${item.titleLeft}, ${item.titleTop})`} className={classes.panelTitle}>
            //         <g>
            //             <rect x="0" y="0" width={item.titleWidth} fill="url(#noisewhite)" />
            //             <text>{item.title}</text>
            //         </g>
            //     </g>
            // </g>
        );
    }
}
