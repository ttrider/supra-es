
import React from 'react';
import  ISurfaceController  from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';
import SelectorCheckbox from './SelectorCheckbox';



export default class SectionSelector extends SurfaceComponent {

    public renderInContext(controller: ISurfaceController, classes: Classes) {

        const sections = controller.sections;

        return (sections) ? (

            <g className={classes.selector} >

                <g className="selectorPanel" transform={`translate(${controller.viewportLeft},0)`} >

                    <rect x="0" y="0" width={sections.selectorWidth} height={controller.surfacesize.height} fill="url(#noisewhite)" />

                    <g className="selectorHeader">
                        <SelectorCheckbox state={false} onClick={sections.selectAll} />
                    </g>

                    <g className="selectorGroups">
                        {sections.sectionGroups.map((item, index) => {

                            return (
                                <g key={index} transform={`translate(0, ${item.selectorTop})`} className="selectorGroup">

                                    {item.sections.map((subitem, subindex) => {
                                        return (
                                            <g key={subindex} transform={`translate(0, ${subitem.selectorTop})`} className="selectorItem" onClick={subitem.select}>

                                                <SelectorCheckbox state={subitem.selected} onClick={subitem.toggle} />
                                                <text x="0" y="0">{subitem.cost}%</text>
                                            </g>);
                                    })}

                                    <rect key={"rect" + index.toString()} x="0" y={item.selectorHeight} width={sections.selectorWidth} />

                                </g>);

                        })};
                    </g>
                </g>
            </g>
        ) : (<></>);
    }
}


