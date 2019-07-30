
import { computed } from 'mobx';
import { measureText } from 'src/helpers/measure-text';
import Layout from './Layout';

export interface ITextLayoutStyle {
    fontFamily: string,
    fontSize: number,
    fontWeight?: string,
    lineHeight: number,

    textAnchor?: string,// "end" | "start" | "middle",

    margin?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    }
};

export default class TextLayout extends Layout {
    private static getNumber(value?: string | number | object) {

        if (value === undefined) {
            return 0;
        }

        if (typeof value === "number") {
            return value;
        }
        if (typeof value === "string") {
            return parseInt(value, 10);
        }

        return 0;

    }
    private textValue?: string;

    private fontStyle: ITextLayoutStyle;

    @computed public get value() {
        return this.textValue;
    }

    public set value(textValue: string | undefined) {
        this.textValue = textValue;
        this.width = measureText(textValue, this.fontStyle);
    }

    public get textAnchor() {
        if (!this.fontStyle.textAnchor) {
            return "start";
        }
        return this.fontStyle.textAnchor;
    }

    public set textAnchor(value: string) {
        this.fontStyle.textAnchor = value;
    }

    public get textClient() {

        const x =
            this.fontStyle.textAnchor === "end"
                ? this.clientRight
                : (this.fontStyle.textAnchor === "middle"
                    ? (this.clientLeft + this.clientRight) / 2
                    : this.clientLeft);


        return {
            x,
            y: this.clientTop + this.clientHeight,
            style: this.style,
            children: this.value
        }
    }

    constructor(text: string, fontStyle: ITextLayoutStyle) {
        super();
        this.fontStyle = fontStyle;
        this.height = TextLayout.getNumber(fontStyle.lineHeight);
        this.value = text;

        if (fontStyle.margin) {
            if (fontStyle.margin.left !== undefined) {
                this.marginLeft = fontStyle.margin.left;
            }
            if (fontStyle.margin.right !== undefined) {
                this.marginRight = fontStyle.margin.right;
            }
            if (fontStyle.margin.top !== undefined) {
                this.marginTop = fontStyle.margin.top;
            }
            if (fontStyle.margin.bottom !== undefined) {
                this.marginBottom = fontStyle.margin.bottom;
            }
        }
    }


}