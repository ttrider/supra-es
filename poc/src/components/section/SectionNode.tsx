import { observer } from 'mobx-react';
import React from 'react';

import ISectionInfo from "src/models/ISectionInfo";
import { NodeAttached, NodeIcon, NodeProperties } from '../Node';
import { SurfaceText, SurfaceTextBox } from '../SurfaceParts';

@observer export default class SectionNode extends React.Component<{ section: ISectionInfo }> {



    public render() {

        const section = this.props.section;
        const node = section.rootNode;

        return (
            <g key={node.id} transform={`translate(0, ${section.selectorTop})`} className={section.selected ? "sectionNodeSelected" : "sectionNode"} >

                <rect {...node.panelLayout.outline} className="frame" onClick={section.select} />

                <NodeIcon node={node} />
                <SurfaceText layout={node.title} className="nodeTitle" />
                <SurfaceTextBox layout={node.subTitle} className="nodeSubtitle" />
                <NodeProperties node={node} />
                <NodeAttached node={node} />
                <SurfaceTextBox layout={node.inputCostLayout} className="nodeInputCost" />


            </g>

        );


    }
}
