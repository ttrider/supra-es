import { splitToLines } from '../helpers/formatter';
import { measureText } from '../helpers/measure-text';
import { ICanvasNode } from '../model/model';
import canvasStyles from "../styles/canvas";
import { ISize, ISizeProvider, nodePaddingMedium } from './layout';
import { ILayoutItemProvider, ITitleLayout, lineHeight } from './layout';


const maxSubtitleWidth = 40;
const subtitlePartWidth = 18;

export class TitleSubtitleLayout implements ISizeProvider, ILayoutItemProvider<ITitleLayout> {

    public get title(): string {
        return this.node.title;
    }

    public get subtitle(): string {
        return this.node.description ? this.node.description : "";
    }
    public subtitlePreview: string;
    public subtitleLines: string[];

    private expandedHeight: number;
    private expandedWidth: number;

    private collapsedHeight: number;
    private collapsedWidth: number;

    constructor(public node: ICanvasNode) {

        const st = this.subtitle;
        const stl = st.length;

        this.subtitlePreview =
            (stl > maxSubtitleWidth)
                ? st.substr(0, subtitlePartWidth) + "..." + st.substr(stl - subtitlePartWidth)
                : st;

        this.subtitleLines = splitToLines(this.subtitle, maxSubtitleWidth);

        const titleWidth = measureText(this.title, canvasStyles.textLargeBold);

        this.collapsedWidth =
            Math.max(
                titleWidth,
                measureText(this.subtitlePreview, canvasStyles.textSmaller))
            + nodePaddingMedium * 2;

        this.collapsedHeight = lineHeight * 2;

        this.expandedHeight = lineHeight * (this.subtitleLines.length + 1);
        this.expandedWidth = titleWidth + nodePaddingMedium * 2;
        for (const line of this.subtitleLines) {
            this.expandedWidth = Math.max(this.expandedWidth, measureText(line, canvasStyles.textSmaller));
        }
    }

    public getSize(expanded?: boolean): ISize {
        return {
            height: expanded ? this.expandedHeight : this.collapsedHeight,
            width: expanded ? this.expandedWidth : this.collapsedWidth
        }
    }

    public getItemLayout(maxWidth: number, top: number, expanded?: boolean): ITitleLayout {

        return {
            top,
            height: expanded ? this.expandedHeight : this.collapsedHeight,
            width: expanded ? this.expandedWidth : this.collapsedWidth,
            title: this.node.title,
            subtitle: expanded ? this.subtitleLines : [this.subtitlePreview]
        }
    }
}

function getTitleSubtitleLayout(node: ICanvasNode) {
    return new TitleSubtitleLayout(node);
}

export default getTitleSubtitleLayout;