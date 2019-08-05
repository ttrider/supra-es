import { action } from 'mobx';
import SurfaceGraphNode from 'src/controllers/panels/GraphNode';
import styles from 'src/controllers/styles';
import { forEachItem } from 'src/helpers';
import AttachedNodeLayout from "./AttachedNodeLayout";
import Layout from './Layout';
export default class AttachedNodesLayout extends Layout {
    public nodes: AttachedNodeLayout[] = [];
    constructor() {
        super({}, {
            left: styles.smallNodeIcon.margin.right,
            top: styles.smallNodeIcon.margin.right,
            right: 0,
            bottom: styles.smallNodeIcon.margin.right
        });
    }
    public push(...nodes: Array<SurfaceGraphNode | SurfaceGraphNode[]>) {
        forEachItem(nodes, node => this.nodes.push(new AttachedNodeLayout(node)));
        return this;
    }
    @action
    public updateLayout(totalHeight: number) {
        const height = totalHeight - this.marginBottom - this.marginTop;
        let right: number = 0;
        let cx = this.marginLeft;
        let cy = this.marginTop;
        for (const node of this.nodes) {
            node.x = cx;
            node.y = cy;
            cy = node.outerBottom;
            if ((cy + node.height) >= height) {
                cy = this.marginTop;
                cx = node.outerRight;
            }
            right = node.outerRight;
        }
        this.width = right;
        this.height = height;
        return this.width;
    }
}
