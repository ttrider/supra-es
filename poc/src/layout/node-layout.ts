import { ICanvasNode } from 'src/model/model';
import { formatCost } from '../helpers/formatter';
import canvasStyles from "../styles/canvas";
import { ISize, ISizeProvider } from './layout';
import { gapWidth, ILayoutItemProvider, INodeLayoutProvider, IPropertiesLayout, ITimingsLayout, ITitleLayout, lineHeight, nodePaddingSmall } from './layout';
import getConnectorsLayout from './node-connectors-layout';
import getPropertiesLayout from './node-properties-layout';
import getTimingsLayout from './node-timings-layout';
import getTitleSubtitleLayout from './node-title-subtitle-layout';



export class NodeLayout implements INodeLayoutProvider {

    public columnIndex: number;
    public rowIndex: number;

    public get id() {
        return this.node.nodeId;
    }

    private titleLayout: ISizeProvider & ILayoutItemProvider<ITitleLayout>;
    private timingsLayout: ISize & ILayoutItemProvider<ITimingsLayout>;
    private propertiesLayout: ISizeProvider & ILayoutItemProvider<IPropertiesLayout>;
    private connectorsLayout: any;


    constructor(public node: ICanvasNode) {

        this.timingsLayout = getTimingsLayout(node);
        this.titleLayout = getTitleSubtitleLayout(node);
        this.propertiesLayout = getPropertiesLayout(node);
        this.connectorsLayout = getConnectorsLayout(node);
    }


    public getNodeLayout() {

        const state: { subtitleExpanded?: boolean, propertiesExpanded?: boolean } = {
            subtitleExpanded: true,
            propertiesExpanded: true
        };

        const titleSize = this.titleLayout.getSize(state.subtitleExpanded);
        const propertiesSize = this.propertiesLayout.getSize(state.propertiesExpanded);



        const maxWidth =
            Math.max(

                this.timingsLayout.width,
                titleSize.width,
                propertiesSize.width
            );

        const connectorsLayout = this.connectorsLayout.getItemLayout(maxWidth, 0);

        let top = lineHeight + gapWidth;



        const timingsLayout = this.timingsLayout.getItemLayout(maxWidth, top);

        top += this.timingsLayout.height + lineHeight + gapWidth;

        const titleLayout = this.titleLayout.getItemLayout(maxWidth, top, state.subtitleExpanded);

        top += (titleLayout.height);

        const propertiesLayout = this.propertiesLayout.getItemLayout(maxWidth, top, state.propertiesExpanded);

        top += propertiesSize.height;
        top += nodePaddingSmall;



        const ret = {
            provider:this, 
            classes: {},
            id: this.node.nodeId,

            x: 0,
            y: 0,
            width: maxWidth,
            height: top,

            outerWidth: maxWidth + this.connectorsLayout.width,
            outerHeight: Math.max(top, this.connectorsLayout.height),

            cost: {
                text: formatCost(this.node.cost),
                x: canvasStyles.nodeHeader.marginLeft,
                y: canvasStyles.nodeHeaderText.lineHeight + canvasStyles.nodeHeader.marginTop
            },
            timings: timingsLayout,
            title: titleLayout,
            properties: propertiesLayout,
            connectors: connectorsLayout,

            outConnector: {
                x: 0,
                y: 60
            }
        }

        return ret;
    }
}

function getNodeLayout(node: ICanvasNode) {
    return new NodeLayout(node);
}

export default getNodeLayout;
