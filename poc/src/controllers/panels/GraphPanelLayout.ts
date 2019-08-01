import { autorun } from 'mobx';
import IGraphNode from 'src/models/IGraphNode';
import SurfacePanelLayout from './SurfacePanelLayout';

const layoutPadding = 50;
export const rowMargin = 75;
export const columnMargin = 50;
export const connectorMargin = 50;

export default class GraphPanelLayout extends SurfacePanelLayout {

    
    public nodeLayouts: { [id: string]: IGraphNode } = {};

    private nodeProviders: { [id: string]: IGraphNode } = {};
    private columnCount: number;
    private rowCount: number;



    constructor(title: string, alignment: "left" | "right", public sections: IGraphNode[]) {
        super(null, title, alignment, 0, 0);

        let maxRow = 0;
        let maxColumn = 0;

        for (const childNode of sections) {
            const max = this.calculateMatrix(childNode, 0, maxRow);

            if (max.maxColumn > maxColumn) {
                maxColumn = max.maxColumn;
            }
            maxRow = max.maxRow;
        }

        this.columnCount = maxColumn + 1;
        this.rowCount = maxRow;

        for (const childNode of sections) {
            this.applyMatrix(childNode, maxColumn);
        }


        autorun(() => {

            // reclaculating layout

            const columnConnectorsCount: number[] = new Array<number>(this.columnCount).fill(0);
            const columnMarkers: number[] = new Array<number>(this.columnCount).fill(0);
            const rowMarkers: number[] = new Array<number>(this.rowCount).fill(0);

            const nodeLayouts: { [id: string]: IGraphNode } = {};

            for (const nodeId in this.nodeProviders) {
                if (this.nodeProviders.hasOwnProperty(nodeId)) {
                    const nodeLayout = this.nodeProviders[nodeId];

                    columnMarkers[nodeLayout.columnIndex] = Math.max(nodeLayout.outerWidth, columnMarkers[nodeLayout.columnIndex]);
                    rowMarkers[nodeLayout.rowIndex] = Math.max(nodeLayout.outerHeight, rowMarkers[nodeLayout.rowIndex]);
                    if (!!nodeLayout.children.length) {
                        columnConnectorsCount[nodeLayout.columnIndex] = Math.max(nodeLayout.children.length, columnConnectorsCount[nodeLayout.columnIndex]);
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

            for (const nodeId in nodeLayouts) {
                if (nodeLayouts.hasOwnProperty(nodeId)) {
                    const nodeLayout = nodeLayouts[nodeId];
                    nodeLayout.x = columnMarkers[nodeLayout.columnIndex];
                    nodeLayout.y = rowMarkers[nodeLayout.rowIndex];
                }
            }


            // connectors
            // for (const nodeId in nodeLayouts) {
            //     if (nodeLayouts.hasOwnProperty(nodeId)) {
            //         const nodeLayout = nodeLayouts[nodeId];

            //         const connectorCount = nodeLayout.connectors.connectors.length;


            //         for (let index = 0; index < connectorCount; index++) {
            //             const connector = nodeLayout.connectors.connectors[index];

            //             const startNode = nodeLayouts[connector.id];
            //             if (startNode) {

            //                 const startX = startNode.x + startNode.outConnector.x - gapWidth;
            //                 const startY = startNode.y + startNode.outConnector.y;

            //                 const endX = nodeLayout.x + connector.x + gapWidth;
            //                 const endY = nodeLayout.y + connector.y - 20;

            //                 if (startY !== endY) {

            //                     const midPointX = endX + ((connectorCount - index) * connectorMargin);

            //                     const cornerMargin = connectorMargin / 2;

            //                     connector.geometry = `M ${startX} ${startY} L ${midPointX + cornerMargin} ${startY} Q ${midPointX} ${startY} ${midPointX} ${startY - cornerMargin} L ${midPointX} ${endY + cornerMargin} Q ${midPointX} ${endY} ${midPointX - cornerMargin} ${endY} L ${endX} ${endY}`;

            //                     // connector.geometry = `M ${startX} ${startY} L ${midPointX} ${startY} L ${midPointX} ${endY} L ${endX} ${endY}`;
            //                 } else {
            //                     connector.geometry = `M ${startX} ${startY} L ${endX} ${endY}`;
            //                 }
            //             }
            //         }
            //     }
            // }

            this.width = positionX;
            this.height = positionY;
            this.nodeLayouts = nodeLayouts;

        });
    }

    private calculateMatrix(node: IGraphNode, column: number, row: number): { maxColumn: number, maxRow: number } {

        this.nodeProviders[node.id] = node;

        let maxColumn = column;
        let maxRow = row;
        node.rowIndex = row;

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

    private applyMatrix(node: IGraphNode, maxColumn: number) {
        let column = maxColumn;

        for (const childNode of node.children) {

            const pos = this.applyMatrix(childNode, maxColumn);
            if (column > pos) {
                column = pos;
            }
        }

        const nodeLayout = this.nodeProviders[node.id];
        nodeLayout.columnIndex = column;

        return column - 1;
    }
}