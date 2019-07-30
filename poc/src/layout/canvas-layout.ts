import getNodeLayout from '../layout/node-layout';
import { ICanvas, ICanvasNode } from "../model/model";
import { columnMargin, connectorMargin, gapWidth, ICanvasLayout, ICanvasLayoutProvider, INodeLayout, INodeLayoutProvider, layoutPadding, rowMargin } from './layout';




class CanvasLayout implements ICanvasLayoutProvider {

    private nodeProviders: { [name: string]: INodeLayoutProvider } = {};

    private columnCount: number;
    private rowCount: number;

    constructor(public canvas: ICanvas) {

        if (canvas.detailedRootNode) {

            const max = this.calculateMatrix(canvas.detailedRootNode, 0, 0);
            this.columnCount = max.maxColumn + 1;
            this.rowCount = max.maxRow;

            this.applyMatrix(canvas.detailedRootNode, max.maxColumn);

        }
    }

    public getCanvasLayout(): ICanvasLayout {

        const columnConnectorsCount: number[] = new Array<number>(this.columnCount).fill(0);
        const columnMarkers: number[] = new Array<number>(this.columnCount).fill(0);
        const rowMarkers: number[] = new Array<number>(this.rowCount).fill(0);

        const nodeLayouts: { [id: string]: INodeLayout } = {};

        // measure columns and rows
        for (const nodeId in this.nodeProviders) {
            if (this.nodeProviders.hasOwnProperty(nodeId)) {
                const nodeProvider = this.nodeProviders[nodeId];

                const nodeLayout = nodeProvider.getNodeLayout();

                columnMarkers[nodeProvider.columnIndex] = Math.max(nodeLayout.outerWidth, columnMarkers[nodeProvider.columnIndex]);
                rowMarkers[nodeProvider.rowIndex] = Math.max(nodeLayout.outerHeight, rowMarkers[nodeProvider.rowIndex]);
                if (!!nodeLayout.connectors.connectors.length) {
                    columnConnectorsCount[nodeProvider.columnIndex] = Math.max(nodeLayout.connectors.connectors.length, columnConnectorsCount[nodeProvider.columnIndex]);
                }

                nodeLayouts[nodeLayout.id] = nodeLayout;
            }
        }

        // position columns
        let positionX = layoutPadding;
        for (let index = 0; index < columnMarkers.length; index++) {
            const marker = columnMarkers[index];

            const offset = marker + columnMargin + (columnConnectorsCount[index] * connectorMargin);

            columnMarkers[index] = positionX;
            positionX += offset;
        }
        positionX += layoutPadding;

        // position rows
        let positionY = layoutPadding;
        for (let index = 0; index < rowMarkers.length; index++) {
            const marker = rowMarkers[index];

            const offset = marker + rowMargin;

            rowMarkers[index] = positionY;
            positionY += offset;
        }
        positionY += layoutPadding;

        // apply node positions
        for (const nodeId in nodeLayouts) {
            if (nodeLayouts.hasOwnProperty(nodeId)) {
                const nodeLayout = nodeLayouts[nodeId];
                nodeLayout.x = columnMarkers[nodeLayout.provider.columnIndex];
                nodeLayout.y = rowMarkers[nodeLayout.provider.rowIndex];
            }
        }

        // connectors
        for (const nodeId in nodeLayouts) {
            if (nodeLayouts.hasOwnProperty(nodeId)) {
                const nodeLayout = nodeLayouts[nodeId];

                const connectorCount = nodeLayout.connectors.connectors.length;


                for (let index = 0; index < connectorCount; index++) {
                    const connector = nodeLayout.connectors.connectors[index];

                    const startNode = nodeLayouts[connector.id];
                    if (startNode) {

                        const startX = startNode.x + startNode.outConnector.x - gapWidth;
                        const startY = startNode.y + startNode.outConnector.y;

                        const endX = nodeLayout.x + connector.x + gapWidth;
                        const endY = nodeLayout.y + connector.y - 20;

                        if (startY !== endY) {

                            const midPointX = endX + ((connectorCount - index) * connectorMargin);

                            const cornerMargin = connectorMargin / 2;

                            connector.geometry = `M ${startX} ${startY} L ${midPointX + cornerMargin} ${startY} Q ${midPointX} ${startY} ${midPointX} ${startY - cornerMargin} L ${midPointX} ${endY + cornerMargin} Q ${midPointX} ${endY} ${midPointX - cornerMargin} ${endY} L ${endX} ${endY}`;

                            // connector.geometry = `M ${startX} ${startY} L ${midPointX} ${startY} L ${midPointX} ${endY} L ${endX} ${endY}`;
                        } else {
                            connector.geometry = `M ${startX} ${startY} L ${endX} ${endY}`;
                        }
                    }
                }
            }
        }

        const ret: ICanvasLayout =
        {
            width: positionX,
            height: positionY,
            nodeLayouts
        };

        return ret;


    }

    private calculateMatrix(node: ICanvasNode, column: number, row: number): { maxColumn: number, maxRow: number } {

        const nodeLayout = getNodeLayout(node);
        this.nodeProviders[nodeLayout.id] = nodeLayout;

        let maxColumn = column;
        let maxRow = row;
        nodeLayout.rowIndex = row;

        if (node.children.length > 0) {
            column++;
            for (const childNode of node.children) {
                const max = this.calculateMatrix(childNode, column, maxRow);

                if (max.maxColumn > maxColumn) {
                    maxColumn = max.maxColumn;
                }
                maxRow = max.maxRow;
            }
        }
        else {
            maxRow++;
        }
        return { maxColumn, maxRow }
    }

    private applyMatrix(node: ICanvasNode, maxColumn: number) {
        let column = maxColumn;

        for (const childNode of node.children) {

            const pos = this.applyMatrix(childNode, maxColumn);
            if (column > pos) {
                column = pos;
            }
        }

        const nodeLayout = this.nodeProviders[node.nodeId];
        nodeLayout.columnIndex = column;

        return column - 1;
    }
}


function createCanvasLayout(canvas: ICanvas): ICanvasLayoutProvider {

    return new CanvasLayout(canvas);
}


export default createCanvasLayout;





