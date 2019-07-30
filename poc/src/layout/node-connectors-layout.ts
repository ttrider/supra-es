import { formatCost } from '../helpers/formatter';
import { measureText } from '../helpers/measure-text';
import { ICanvasNode } from '../model/model';
import canvasStyles from "../styles/canvas";
import { IConnector, IConnectorsLayout, ILayoutItemProvider } from './layout';



export class ConnectorsLayout implements ILayoutItemProvider<IConnectorsLayout> {

    public height: number;
    public width: number;

    public connectors: Array<{ id: string, title: string, titleWidth: number }>;

    constructor(public node: ICanvasNode) {

        let maxWidth = 0;
        this.connectors = node.children.map((child) => {

            const title = formatCost(child.cost) + "% ❯";
            const titleWidth = measureText(title, canvasStyles.nodeIncomingPanelText) + canvasStyles.nodeIncomingPanelText.marginLeft;
            maxWidth = Math.max(maxWidth, titleWidth);

            return { id: child.nodeId, title, titleWidth };
        });
        this.width = maxWidth;
        this.height = this.connectors.length * canvasStyles.nodeIncomingPanelText.lineHeight + canvasStyles.nodeIncomingPanel.marginTop;
    }

    public getItemLayout(maxWidth: number, top: number): IConnectorsLayout {

        const x = maxWidth + this.width;

        return {
            width: this.width,
            height: this.height,
            connectors: this.connectors.map((item, index) => {

                return {
                    id: item.id,
                    title: item.title,
                    titleWidth: item.titleWidth,
                    x,
                    y: top + (index * canvasStyles.nodeIncomingPanelText.lineHeight) + canvasStyles.nodeIncomingPanel.marginTop,

                    geometry: ""
                } as IConnector;
            })
        };
    }
}

function getConnectorsLayout(node: ICanvasNode) {
    return new ConnectorsLayout(node);
}

export default getConnectorsLayout;
