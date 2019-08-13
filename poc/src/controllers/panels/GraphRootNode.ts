import { action, autorun, observable } from 'mobx';
import AttachedNodesLayout from "src/controllers/layout/AttachedNodesLayout";
import InputCostLayout from "src/controllers/layout/InputCostLayout";
import Layout from 'src/controllers/layout/Layout';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import styles from 'src/controllers/styles';
import IGraphNode from "src/models/IGraphNode";
import TextBoxLayout from '../layout/TextBoxLayout';
import TextLayout from '../layout/TextLayout';
import SurfaceGraphNode from './GraphNode';
import { GraphNodeBuilder } from './GraphNodeBuilder';

export default class SurfaceGraphRootNode<T = any> extends Layout implements IGraphNode {

    public id: string;

    public readonly iconLayout: Layout;
    public readonly title: TextLayout;
    public readonly subTitle: TextBoxLayout;
    public readonly absoluteWeight: number;
    public readonly relativeWeight: number;
    public readonly propertiesTitle: TextLayout;
    public readonly properties: PropertiesLayout;
    public readonly attachedNodesLayout: AttachedNodesLayout;
    public readonly panelLayout: Layout;
    public readonly inputCostLayout: InputCostLayout;
    public readonly data: T;
    public readonly children: Array<SurfaceGraphNode<T>> = [];
    public readonly rowIndex: number;
    public readonly columnIndex:number;

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

        this.subTitle.textAnchor = "start";
        this.subTitle.textOverflowMode = "end-ellipsis";
        this.propertiesTitle.textAnchor = "start";

        autorun(() => {
            this.updateLayout(this.propertiesExpanded);
        });
    }

    public toggleProperties = () => {

        this.propertiesExpanded = !this.propertiesExpanded;
    }

    @action private updateLayout(propertiesExpanded: boolean) {

        // icon        | A | 100% >
        // title       | A |
        // subtitle    | A |
        // properties  | A |

        

        this.panelLayout.width = Math.max(
            this.iconLayout.outerWidth,
            this.propertiesTitle.outerWidth,
            (propertiesExpanded ? this.properties.outerRight : 0)
        );

        this.subTitle.maxWidth = this.panelLayout.width;

        this.subTitle.y = this.iconLayout.outerBottom;
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





