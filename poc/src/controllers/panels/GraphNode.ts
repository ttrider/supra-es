import { action, autorun, computed, observable } from 'mobx';
import AttachedNodesLayout from "src/controllers/layout/AttachedNodesLayout";

import Layout from 'src/controllers/layout/Layout';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import styles from 'src/controllers/styles';
import { formatCost } from 'src/helpers/formatter';
import IGraphNode from "src/models/IInputCost";
import TextBoxLayout from '../layout/TextBoxLayout';
import TextLayout from '../layout/TextLayout';
import { GraphNodeBuilder } from './GraphNodeBuilder';

export default class SurfaceGraphNode<T = any> extends Layout implements IGraphNode {

    public static lastNodeId = 1;
    public id: string;

    public readonly costLabel: TextLayout;
    public readonly iconLayout: Layout;
    public readonly title: TextLayout;
    public readonly subTitle: TextBoxLayout;
    public readonly absoluteWeight: number;
    public readonly relativeWeight: number;
    public readonly propertiesTitle: TextLayout;
    public readonly properties: PropertiesLayout;
    public readonly attachedNodesLayout: AttachedNodesLayout;
    public readonly panelLayout: Layout;
    public readonly children: Array<SurfaceGraphNode<T>> = [];
    public readonly inputCostLayout: TextBoxLayout;
    public readonly data: T;
    public readonly rowIndex: number;
    public readonly columnIndex: number;

    @computed public get cost() {
        return this.relativeWeight;
    }


    @observable public propertiesExpanded: boolean = false;

    constructor(builder: GraphNodeBuilder<T>) {
        super();
        this.id = `node-${SurfaceGraphNode.lastNodeId++}`;


        this.data = builder.data;
        this.iconLayout = builder.iconLayout;
        this.title = builder.title;
        this.subTitle = builder.subTitle;
        this.absoluteWeight = builder.absoluteWeight;
        this.relativeWeight = builder.relativeWeight;
        this.propertiesTitle = builder.propertiesTitle;
        this.properties = builder.properties;
        this.attachedNodesLayout = builder.attachedNodesLayout;
        this.panelLayout = builder.panelLayout;
        this.children = builder.children;
        this.inputCostLayout = builder.inputCostLayout;

        this.costLabel = new TextLayout("❮ "+formatCost(this.cost)+"%", styles.nodeOutputCost);

        autorun(() => {
            this.updateLayout(this.propertiesExpanded);
        });
    }

    public toggleProperties = () => {

        this.propertiesExpanded = !this.propertiesExpanded;
    }

    @action private updateLayout(propertiesExpanded: boolean) {

        // cost 9999
        // icon        | A | 100% >
        // title       | A |
        // subtitle    | A |
        // properties  | A |


        this.panelLayout.width = Math.max(
            this.costLabel.outerWidth,
            this.iconLayout.outerWidth,
            this.title.outerWidth,
            this.propertiesTitle.outerWidth,
            (propertiesExpanded ? this.properties.outerWidth : 0)
        );

        this.subTitle.maxWidth = this.panelLayout.width;

        this.title.x = (this.panelLayout.width - this.title.outerWidth) / 2;
        this.propertiesTitle.x = (this.panelLayout.width - this.propertiesTitle.outerWidth) / 2;

        this.iconLayout.y = this.costLabel.outerBottom;
        this.title.y = this.iconLayout.outerBottom;
        this.subTitle.y = this.title.outerBottom;
        this.propertiesTitle.y = this.subTitle.outerBottom;
        this.properties.y = this.propertiesTitle.outerBottom;

        this.panelLayout.height =
            this.propertiesTitle.outerBottom +
            (propertiesExpanded ? this.properties.outerHeight : 0)
            + styles.node.padding.bottom;

        const height = Math.max(this.panelLayout.outerHeight, this.inputCostLayout.outerHeight);

        let width = this.panelLayout.outerRight;

        if (this.attachedNodesLayout && this.attachedNodesLayout.nodes && this.attachedNodesLayout.nodes.length) {
            this.attachedNodesLayout.x = this.panelLayout.outerRight;
            width += this.attachedNodesLayout.updateLayout(height);
        }

        this.inputCostLayout.x = width;

        this.width = this.inputCostLayout.outerRight;
        this.height = height;
    }
}



// tslint:disable-next-line:max-classes-per-file

// import { SurfaceProperties } from 'src/surface/properties';

// import { computed, observable } from 'mobx';

// import { measureText } from 'src/helpers/measure-text';

// import styles from 'src/surface/styles';

// import { formatCost } from 'src/helpers/formatter';
// import { IRect } from 'src/models/IRect';
// import ISize from 'src/models/ISize';
// import { ISurfaceMetric } from 'src/models/ISurfaceMetric';

// export class SurfaceGraphNode {
//     public static lastNodeId = 1;

//     public id: string;
//     public absoluteWeight: number;
//     public relativeWeight: number;
//     public title: string;
//     public subTitle: string[];
//     public flags: string[];
//     public metrics: ISurfaceMetric[] = [];
//     public properties: SurfaceProperties = new SurfaceProperties();
//     public children: SurfaceGraphNode[] = [];
//     public attachedChildren: SurfaceGraphNode[] = [];

//     public inputPanel: SurfaceProperties = new SurfaceProperties();
//     public outputPanel: SurfaceProperties = new SurfaceProperties();

//     @observable public subTitleExpanded: boolean = false;
//     @observable public propertiesExpanded: boolean = false;
//     @observable public inputPanelExpanded: boolean = false;
//     @observable public outputPanelExpanded: boolean = false;


//     // layout properties
//     @computed.struct public get cost() {
//         return 0.999;
//     }

//     @computed.struct private get metricsSectionDimentions() {

//         const metrics = this.metrics.reduce((w, item) => {

//             const ret =
//             {
//                 title: Math.max(measureText(item.title + ": ", item.marked ? styles.nodeMetricsTitleMarked : styles.nodeMetricsTitle), w.title),
//                 value: Math.max(measureText(item.value, item.marked ? styles.nodeMetricsValueMarked : styles.nodeMetricsValue), w.value),
//                 description: Math.max(measureText(item.description, item.marked ? styles.nodeMetricsValueMarked : styles.nodeMetricsValue), w.description)
//             };
//             return ret;

//         }, { title: 0, value: 0, description: 0 });

//         const iconRect: IRect = {
//             x: styles.node.padding.left,
//             y: styles.nodeMetrics.padding.top,
//             width: styles.nodeIcon.width,
//             height: styles.nodeIcon.height,
//         }

//         const metricsRect: IRect = {
//             x: iconRect.x + iconRect.width + styles.nodeIcon.margin.right,
//             y: styles.nodeMetrics.padding.top,
//             width: Math.max(metrics.title + styles.nodeMetricsTitle.marginRight + metrics.value, metrics.description),
//             height: this.metrics.length * styles.nodeMetricsTitle.lineHeight * 2
//         }

//         const width =
//             metricsRect.x +
//             metricsRect.width +
//             styles.node.padding.right;

//         const height =
//             Math.max(iconRect.height, metricsRect.height) +
//             styles.nodeMetrics.padding.top +
//             styles.nodeMetrics.padding.bottom;

//         return {
//             width,
//             height,
//             iconRect,
//             metricsRect
//         }
//     }

//     @computed.struct private get outputCostDimentions() {

//         return {
//             x: styles.node.padding.left,
//             y: styles.node.padding.top,
//             height: styles.nodeOutputCost.lineHeight,
//             width: 0
//         } as IRect;
//     }

//     @computed.struct private get titleSize() {

//         return {
//             height: styles.nodeTitle.lineHeight + styles.nodeTitle.padding.bottom,
//             width: measureText(this.title, styles.nodeTitle),
//         } as ISize;
//     }

//     @computed.struct private get subTitleLines() {

//         if (this.subTitleExpanded) {

//             return this.subTitle;

//         } else {

//             return this.subTitle;
//         }
//     }

//     @computed.struct private get subTitleMinSize() {

//         return {
//             left: 0,
//             top: 0,
//             height: styles.nodeSubtitle.lineHeight * this.subTitleLines.length + styles.nodeSubtitle.padding.bottom,
//             width: 0
//         };
//     }

//     @computed.struct private get propertiesSize() {

//         const propTitleWidth = measureText("PROPERTIES", styles.nodePropertiesTitle);
//         const propTitleHeight = styles.nodePropertiesTitle.lineHeight;

//         if (this.propertiesExpanded) {

//             const pd = this.properties.dimentions;

//             return {
//                 height: propTitleHeight + pd.height,

//                 width: Math.max(propTitleWidth, pd.width) +
//                     styles.node.padding.left +
//                     styles.node.padding.right
//             } as ISize;

//         } else {
//             return {
//                 height: propTitleHeight,
//                 width: propTitleWidth + styles.node.padding.left + styles.node.padding.right
//             } as ISize;
//         }
//     }

//     @computed.struct private get inputPanelMinSize() {

//         const sz = this.inputPanel.dimentions;
//         if (sz.width === 0) {
//             return sz;
//         }

//         if (this.inputPanelExpanded) {
//             return {
//                 width: sz.width + styles.node.padding.left + styles.node.padding.right,
//                 height: sz.height + styles.node.padding.top + styles.node.padding.bottom
//             } as ISize;
//         }

//         return {
//             width: styles.nodeBorder.rx * 2,
//             height: styles.nodeBorder.rx * 2
//         } as ISize;
//     }

//     @computed.struct private get outputPanelMinSize() {

//         const sz = this.outputPanel.dimentions;
//         if (sz.width === 0) {
//             return sz;
//         }

//         if (this.outputPanelExpanded) {
//             return {
//                 width: sz.width + styles.node.padding.left + styles.node.padding.right,
//                 height: sz.height + styles.node.padding.top + styles.node.padding.bottom
//             } as ISize;
//         }

//         return {
//             width: styles.nodeBorder.rx * 2,
//             height: styles.nodeBorder.rx * 2
//         } as ISize;

//     }

//     @computed.struct private get inputCostSize() {

//         let maxWidth = 0;
//         const connectors = this.children.map((child, index) => {

//             const title = formatCost(child.cost) + "% ❯";
//             const titleWidth = measureText(title, styles.nodeInputCost) + styles.nodeInputCost.margin.left;
//             maxWidth = Math.max(maxWidth, titleWidth);

//             return { id: child.id, left: 0, top: index * styles.nodeInputCost.lineHeight, title, titleWidth };
//         });

//         const width = maxWidth;
//         const height = connectors.length * styles.nodeInputCost.lineHeight + styles.nodeInputCostPanel.margin.top;

//         connectors.forEach(c => c.left = width);

//         return {
//             width,
//             height,
//             connectors
//         }

//     }

//     @computed.struct private get panelWidth() {

//         return Math.max(
//             this.metricsSectionDimentions.width,
//             this.titleSize.width,
//             this.subTitleMinSize.width,
//             this.flagsMinSize.width,
//             this.propertiesSize.width
//         );
//     }

//     @computed.struct private get flagsMinSize() {

//         let maxWidth = 0;

//         const flagsDimentions = this.flags.map(flag => {
//             const flagWidth = measureText(flag + ", ", styles.nodeFlags);

//             maxWidth = Math.max(maxWidth, flagWidth);

//             return {
//                 flag,
//                 width: flagWidth
//             }
//         });

//         return {
//             width: maxWidth,
//             flags: flagsDimentions
//         }

//     }

//     @computed.struct private get flagsSize() {

//         const maxWidth = this.panelWidth;
//         const flags = this.flagsMinSize;

//         const flagLines: string[] = [];
//         let currentWidth = 0;
//         let currentSet: string[] = [];

//         for (const flag of flags.flags) {

//             if (currentWidth + flag.width > maxWidth) {
//                 flagLines.push(currentSet.join(", "));

//                 currentSet = [];
//                 currentWidth = 0;
//             }

//             currentSet.push(flag.flag);
//             currentWidth += flag.width;
//         }
//         if (currentSet.length > 0) {
//             flagLines.push(currentSet.join(", "));
//         }

//         const ret =
//         {
//             width: flags.width,
//             height: flagLines.length * styles.nodeFlags.lineHeight,
//             lines: flagLines
//         };

//         return ret;
//     }

//     @computed.struct private get subTitleSize() {

//         // const maxWidth = this.panelWidth;

//         return {
//             height: styles.nodeSubtitle.lineHeight * this.subTitleLines.length + styles.nodeSubtitle.padding.bottom,
//             width: 0
//         };
//     }

//     @computed.struct private get panelSize() {

//         const panelMinHeight =
//             this.outputCostDimentions.height +
//             this.metricsSectionDimentions.height +
//             this.titleSize.height +
//             this.subTitleSize.height +
//             this.flagsSize.height +
//             this.propertiesSize.height;

//         return {
//             height:
//                 Math.max(
//                     panelMinHeight,
//                     this.inputPanelMinSize.height,
//                     this.outputPanelMinSize.height,
//                     this.inputCostSize.height
//                 ),
//             width: this.panelWidth
//         };
//     }

//     @computed.struct private get attachedNodeSize() {

//         const iconWidth = styles.smallNodeIcon.width + styles.smallNodeIcon.margin.right;
//         const iconHeight = styles.smallNodeIcon.height + styles.smallNodeIcon.margin.right;

//         const maxHeight = this.panelSize.height;

//         let top = 0;
//         let left = 0;

//         const ret: {

//             width: number;
//             height: number;
//             items: Array<{

//                 left: number;
//                 top: number;
//                 width: number;
//                 height: number;
//                 node: SurfaceGraphNode

//             }>

//         } = {

//             width: 0,
//             height: 0,
//             items: []
//         };

//         for (const ac of this.attachedChildren) {

//             ret.items.push({
//                 left,
//                 top,
//                 height: styles.smallNodeIcon.height,
//                 width: styles.smallNodeIcon.width,
//                 node: ac
//             });

//             top += iconHeight;
//             if (top >= maxHeight) {
//                 top = 0;
//                 left += iconWidth;
//             }
//         }

//         ret.height = maxHeight;
//         ret.width = left + iconWidth;

//         return ret;
//     }



//     @computed public get width() {
//         const width =
//             this.outputPanelMinSize.width +
//             this.panelSize.width +
//             this.inputPanelMinSize.width +
//             this.attachedNodeSize.width +
//             this.inputCostSize.width;
//         return width;
//     }

//     @computed public get height() {
//         return this.panelSize.height;
//     }

//     constructor() {
//         this.id = `node${SurfaceGraphNode.lastNodeId++}`;
//     }

//     public initialize() {

//         // precalculate dimentions
//         const metricsSection = this.metricsSectionDimentions;
//         // tslint:disable-next-line:no-console
//         console.info(metricsSection);





//         return this;
//     }
// }