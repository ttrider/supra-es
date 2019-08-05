import SurfaceGraphNode from 'src/controllers/panels/GraphNode';
import styles from 'src/controllers/styles';
import Layout from './Layout';

export default class AttachedNodeLayout extends Layout {
    // #region Constructors (1)

    constructor(public node: SurfaceGraphNode) {
        super({
            width: styles.smallNodeIcon.width,
            height: styles.smallNodeIcon.height,
        }, {
                right: styles.smallNodeIcon.margin.right,
                bottom: styles.smallNodeIcon.margin.right
            });
        this.style = {
            fill: "none",
            stroke: "green"
        };
    }

    // #endregion Constructors (1)
}
