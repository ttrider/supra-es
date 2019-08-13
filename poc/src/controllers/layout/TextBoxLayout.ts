import { action, autorun, computed, observable } from 'mobx';
import { fitText } from 'src/helpers/measure-text';
import { ITextLayoutStyle } from '../../models/ITextLayoutStyle';
import Layout from './Layout';


export default class TextBoxLayout extends Layout {

    @observable public maxWidth: number = 0;
    @observable public textOverflowMode: "start-ellipsis" | "mid-ellipsis" | "end-ellipsis";

    @observable public textAnchor: "start" | "middle" | "end";

    @computed public get clientMaxWidth() {

        const mw = this.maxWidth - this.marginLeft - this.marginRight;
        return (mw < 0) ? 0 : mw;
    }

    @computed public get textClients() {

        const right = this.clientMaxWidth ? this.clientLeft + this.clientMaxWidth : this.clientRight;

        const x =
            this.fontStyle.textAnchor === "end"
                ? right
                : (this.fontStyle.textAnchor === "middle"
                    ? this.clientLeft + right / 2
                    : this.clientLeft);

        let y = this.clientTop;

        return this.displayLines.map(line => {
            return {
                x,
                y: (y += this.fontStyle.lineHeight),
                style: this.style,
                children: line
            }
        });
    }

    @observable private lines: any[] = [];

    @observable private displayLines: string[] = [];
    private fontStyle: ITextLayoutStyle;


    constructor(text: string | string[], fontStyle: ITextLayoutStyle) {
        super({}, fontStyle.margin);
        this.fontStyle = fontStyle;
        this.add(text);

        this.textAnchor = this.fontStyle.textAnchor ? this.fontStyle.textAnchor : "start";

        autorun(() => {

            // recalculate layout

            let actualWidth = 0;

            const displayLines: string[] = [];

            for (const line of this.lines) {
                const { transformedText, transformedWidth } = fitText(line, this.fontStyle, this.clientMaxWidth, this.textOverflowMode);
                displayLines.push(transformedText);
                actualWidth = Math.max(actualWidth, transformedWidth);
            }


            this.width = actualWidth;
            this.height = this.lines.length * this.fontStyle.lineHeight;
            this.displayLines = displayLines;
        });
    }

    @action public add(...text: Array<string | string[]>) {

        for (let textList of text) {

            if (!Array.isArray(textList)) {
                textList = [textList];
            }

            for (const textItem of textList) {

                const lineList = textItem.split(/^/gm).map(i => i.trim());

                for (const line of lineList) {
                    this.lines.push(line);
                }
            }
        }
    }
}