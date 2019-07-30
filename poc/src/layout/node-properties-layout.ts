import { nsTimeToString } from '../helpers/formatter';
import { measureText } from '../helpers/measure-text';
import { ICanvasNode } from "../model/model";
import canvasStyles from "../styles/canvas";
import { ISize, ISizeProvider } from './layout';
import { gapWidth, ILayoutItemProvider, IPropertiesLayout, IPropertiesRow, lineHeight, nodePaddingMedium } from './layout';

const propertiesBreakdownLabelWidth = measureText("Breakdown", canvasStyles.textSmallerBold);
const propertiesDurationLabelWidth = measureText("Duration", canvasStyles.textSmallerBold);
const propertiesCountLabelWidth = measureText("Count", canvasStyles.textSmallerBold);

const propertiesWidth = measureText("PROPERTIES", canvasStyles.textBold);

export class PropertiesLayout implements ISizeProvider, ILayoutItemProvider<IPropertiesLayout> {


    public propertiesColumns: number[];

    private expandedHeight: number;
    private expandedWidth: number;

    private collapsedHeight: number;
    private collapsedWidth: number;

    private rows: IPropertiesRow[];

    constructor(public node: ICanvasNode) {


        this.rows = node.properties.map((item) => {

            return {
                columns: [
                    item.name,
                    item.absTime.toString() + "ns",
                    item.count.toString()
                ],
                spanString: nsTimeToString(item.absTime)

            } as IPropertiesRow;
        });



        this.propertiesColumns = (this.rows.reduce((columns, row) => {

            columns[0] = Math.max(columns[0], measureText(row.columns[0], canvasStyles.textSmaller));
            columns[1] = Math.max(columns[1], measureText(row.columns[1], canvasStyles.textSmaller));
            columns[2] = Math.max(columns[2], measureText(row.columns[2], canvasStyles.textSmaller));
            return columns;
        }, [
            propertiesBreakdownLabelWidth,
            propertiesDurationLabelWidth,
            propertiesCountLabelWidth,
        ] as number[]))
            ;

        if (node.properties.length > 0) {
            this.expandedHeight = (node.properties.length * 2 + 2) * lineHeight;
            this.expandedWidth = this.propertiesColumns.reduce((width, column) => width + column, gapWidth + gapWidth + nodePaddingMedium + nodePaddingMedium)

            this.collapsedHeight = lineHeight;
            this.collapsedWidth = propertiesWidth;
        } else {
            this.expandedHeight =
                this.expandedWidth =
                this.collapsedHeight =
                this.collapsedWidth = 0;
        }
    };



    public getColumnPositions(maxWidth: number) {
        const propertiesCountRight = maxWidth - nodePaddingMedium;
        return {
            countRight: propertiesCountRight,
            nameLeft: nodePaddingMedium,
            timeRigth: propertiesCountRight - this.propertiesColumns[2] - gapWidth
        };
    }

    public getSize(expanded?: boolean): ISize {
        return {
            height: expanded ? this.expandedHeight : this.collapsedHeight,
            width: expanded ? this.expandedWidth : this.collapsedWidth
        };
    }

    public getItemLayout(maxWidth: number, top: number, expanded?: boolean): IPropertiesLayout {

        const propertiesCountRight = maxWidth - nodePaddingMedium;

        return {
            expanded: !!expanded,
            top,
            columnWidth: this.propertiesColumns,
            columnPositions: [nodePaddingMedium, propertiesCountRight - this.propertiesColumns[2] - gapWidth, propertiesCountRight],
            rows: this.rows
        };

    }
}

function getPropertiesLayout(node: ICanvasNode) {
    return new PropertiesLayout(node);
}

export default getPropertiesLayout;



