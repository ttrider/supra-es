import { action } from 'mobx';
import AttachedNodesLayout from "src/controllers/layout/AttachedNodesLayout";
import Layout from 'src/controllers/layout/Layout';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import styles from 'src/controllers/styles';
import { formatCost } from 'src/helpers/formatter';
import IInputCost from 'src/models/IInputCost';
import TextBoxLayout from '../layout/TextBoxLayout';
import TextLayout from '../layout/TextLayout';
import SurfaceGraphNode from './GraphNode';
import SurfaceGraphRootNode from './GraphRootNode';

export class GraphNodeBuilder<TSection> {
    public iconLayout: Layout;
    public title: TextLayout;
    public subTitle: TextBoxLayout;
    public absoluteWeight: number;
    public relativeWeight: number;
    public propertiesTitle: TextLayout;
    public properties: PropertiesLayout;
    public attachedNodesLayout: AttachedNodesLayout;
    public panelLayout: Layout;
    public data: TSection;
    public inputCostLayout: TextBoxLayout;
    public readonly children: SurfaceGraphNode[] = [];
    public readonly childrenCost: IInputCost[] = [];
    constructor() {
        this.propertiesTitle = new TextLayout("PROPERTIES", styles.nodePropertiesTitle);
        this.propertiesTitle.marginLeft = styles.node.padding.left;
        this.propertiesTitle.marginRight = styles.node.padding.right;

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
    @action public setTitle(title: string = "") {
        this.title = new TextLayout(title, styles.nodeTitle);
        this.title.marginLeft = styles.node.padding.left;
        this.title.marginRight = styles.node.padding.right;

        return this;
    }
    @action public setSubtitle(subtitle?: string[] | string) {
        if (subtitle) {
            if (!this.subTitle) {
                this.subTitle = new TextBoxLayout(subtitle, styles.nodeSubtitle);
                this.subTitle.marginLeft = styles.node.padding.left;
                this.subTitle.marginRight = styles.node.padding.right;
                this.subTitle.textOverflowMode = "mid-ellipsis";
            } else {
                this.subTitle.add(subtitle);
            }
        }

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
        this.childrenCost.push(...nodes);
        return this;
    }
    public setChildrenCosts(children?: IInputCost[]) {
        if (children) {
            this.childrenCost.push(...children);
        }

        return this;
    }

    public setData(data: TSection) {
        this.data = data;
        return this;
    }
    public buildRoot() {
        this.inputCostLayout = new TextBoxLayout(this.childrenCost.map(item=>formatCost(item.cost) + "% ❯"), styles.nodeInputCost)
        return new SurfaceGraphRootNode<TSection>(this);
    }

    public build(): SurfaceGraphNode<TSection> {
        this.inputCostLayout = new TextBoxLayout(this.childrenCost.map(item=>formatCost(item.cost) + "% ❯"), styles.nodeInputCost)
        return new SurfaceGraphNode<TSection>(this);
    }

}

export function graphRootNodeBuilder<TSection = any>() {
    return new GraphNodeBuilder<TSection>();
}

