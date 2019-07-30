import React from 'react';

import  ISurfaceController  from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';
import SectionNode from './SectionNode';



export default class SectionPanel extends SurfaceComponent {


    public renderInContext(controller:ISurfaceController, classes:Classes) {

        const sectionSet = controller.sections; 

        return sectionSet ? (
            <g className={classes.sectionPanel} transform={`translate(${sectionSet.selectorWidth},0)`} >
                <g className="sectionPanelHeader">
                    <text>{sectionSet.selectorHeaderTitle}</text>
                </g>

                <g className="sectionGroups">
                    {sectionSet.sectionGroups.map((item, index) => {

                        return (
                            <g key={index} transform={`translate(0, ${item.selectorTop})`} className="sectionGroup">

                                {item.sections.map((subitem) => {
                                    return (<SectionNode key={"node_" + subitem.id} section={subitem} />);
                                })}

                                <rect key={"rect" + index.toString()} x="0" y={item.selectorHeight} width={sectionSet.sectionPanelWidth} className="separator" />

                            </g>);

                    })};
                    </g>
            </g>
        ) : (<></>);
    }

}


