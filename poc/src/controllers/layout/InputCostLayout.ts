import styles from 'src/controllers/styles';
import { formatCost } from 'src/helpers/formatter';
import IInputCost from 'src/models/IInputCost';
import Layout from './Layout';
import TextLayout from './TextLayout';
export default class InputCostLayout extends Layout {
    public connectors: TextLayout[];
    constructor(public children: IInputCost[]) {
        super({}, { top: styles.nodeInputCostPanel.margin.top });

        let width = 0;

        this.connectors = this.children.map((child, index) => {
            const title = new TextLayout(formatCost(child.cost) + "%", styles.nodeInputCost);
            title.id = child.id;
            title.y = index * styles.nodeInputCost.lineHeight;
            width = Math.max(width, title.outerWidth);
            return title;
        });
        
        this.height = this.children.length * styles.nodeInputCost.lineHeight;
        this.width = width;
    }
}
