import AttachedNodesLayout from "src/controllers/layout/AttachedNodesLayout";
import InputCostLayout from "src/controllers/layout/InputCostLayout";
import Layout from 'src/controllers/layout/Layout';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import styles from 'src/controllers/styles';
import TextLayout from '../layout/TextLayout';
import SurfaceGraphNode from './GraphNode';
import SurfaceGraphRootNode from './GraphRootNode';
// tslint:disable-next-line:max-classes-per-file
export class GraphRootNodeBuilder<TSection> {
    public iconLayout: Layout;
    public title: TextLayout;
    public subTitle: TextLayout;
    public absoluteWeight: number;
    public relativeWeight: number;
    public propertiesTitle: TextLayout;
    public properties: PropertiesLayout;
    public attachedNodesLayout: AttachedNodesLayout;
    public panelLayout: Layout;
    public data: TSection;
    public inputCostLayout: InputCostLayout;
    public readonly children: SurfaceGraphNode[] = [];
    constructor() {
        this.propertiesTitle = new TextLayout("PROPERTIES", styles.nodePropertiesTitle);
        this.propertiesTitle.marginLeft = styles.node.padding.left;
        this.propertiesTitle.marginRight = styles.node.padding.right;
        this.propertiesTitle.style = {
            textAnchor: "start"
        };
        this.iconLayout = new Layout({
            x: 0,
            y: 0,
            width: styles.nodeIcon.width,
            height: styles.nodeIcon.height
        }, {
                left: styles.node.padding.left,
                right: styles.node.padding.right,
                top: styles.nodeMetrics.padding.top,
                bottom: 0
            });
        this.panelLayout = new Layout();
        this.panelLayout.marginBottom = styles.node.padding.bottom;
    }
    public setTitle(title: string = "") {
        this.title = new TextLayout(title, styles.nodeTitle);
        this.title.marginLeft = styles.node.padding.left;
        this.title.marginRight = styles.node.padding.right;
        this.title.style = {
            textAnchor: "start"
        };
        return this;
    }
    public setSubtitle(subtitle?: string[] | string) {
        // TODO
        return this;
    }
    public setWeights(absolute?: number, relative?: number) {
        if (absolute !== undefined) {
            this.absoluteWeight = absolute;
        }

        if (relative !== undefined) {
            this.relativeWeight = relative;
        }
        return this;
    }
    public setProperties(properties: PropertiesLayout) {
        this.properties = properties;
        return this;
    }
    public setAttachedNodes(attachedNodesLayout: AttachedNodesLayout) {
        this.attachedNodesLayout = attachedNodesLayout;
        return this;
    }
    public setChildNodes(nodes: SurfaceGraphNode[]) {
        this.children.push(...nodes);
        return this;
    }
    public setData(data: TSection) {
        this.data = data;
        return this;
    }
    public buildRoot() {
        this.inputCostLayout = new InputCostLayout(this.children);
        return new SurfaceGraphRootNode<TSection>(this);
    }

    public build(): SurfaceGraphNode<TSection> {
        this.inputCostLayout = new InputCostLayout(this.children);
        return new SurfaceGraphNode<TSection>(this);
    }
}

export function graphRootNodeBuilder<TSection = any>() {
    return new GraphRootNodeBuilder<TSection>();
}

