import { nsTimeToString } from '../helpers/formatter';
import { measureText } from '../helpers/measure-text';
import { ICanvasNode } from '../model/model';
import canvasStyles from "../styles/canvas";
import { ISize } from './layout';
import { gapWidth, iconSize, ILayoutItemProvider, ITimingsLayout, lineHeight, nodePaddingMedium } from './layout';


const timingLabelWidth = Math.max(
    measureText("RELATIVE:", canvasStyles.textSmaller),
    measureText("ABSOLUTE:", canvasStyles.textSmaller)
);

export class TimingsLayout implements ISize, ILayoutItemProvider<ITimingsLayout> {

    public height: number;
    public width: number;

    private values: Array<{ label: string, value: string, subValue: string }>;


    constructor(public node: ICanvasNode) {
        const absOnly = node.relTime === node.absTime;

        this.height = Math.max(iconSize, lineHeight * ((absOnly) ? 2 : 4));
        this.width = nodePaddingMedium
            + iconSize +
            gapWidth +
            timingLabelWidth +
            gapWidth +
            Math.max(
                measureText(node.relTime + " ns", canvasStyles.textSmaller),
                measureText(node.absTime + " ns", canvasStyles.textSmaller)
            ) +
            nodePaddingMedium;

        if (absOnly) {
            this.values = [
                {
                    label: "ABSOLUTE",
                    value: nsTimeToString(node.absTime),
                    subValue: node.absTime + " ns"
                }
            ];
        } else {
            this.values = [
                {
                    label: "RELATIVE",
                    value: nsTimeToString(node.relTime),
                    subValue: node.relTime + " ns"
                },
                {
                    label: "ABSOLUTE",
                    value: nsTimeToString(node.absTime),
                    subValue: node.absTime + " ns"
                }
            ];
        }

    }

    public getItemLayout(maxWidth: number, top: number): ITimingsLayout {

        return {
            iconHeight: iconSize,
            iconWidth: iconSize,
            x: nodePaddingMedium,
            y: top,
            textY: top + lineHeight,
            labelX: nodePaddingMedium + iconSize + gapWidth,
            valueX: maxWidth - nodePaddingMedium,
            lineHeight,
            values: this.values
        }
    }
}

function getTimingsLayout(node: ICanvasNode) {
    return new TimingsLayout(node);
}

export default getTimingsLayout;