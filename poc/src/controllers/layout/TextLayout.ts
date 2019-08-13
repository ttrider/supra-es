import { computed, observable } from 'mobx';
import { measureText } from 'src/helpers/measure-text';
import { ITextLayoutStyle } from '../../models/ITextLayoutStyle';
import Layout from './Layout';

export default class TextLayout extends Layout {

    @observable public textAnchor: "start" | "middle" | "end";
    
    private textValue?: string;

    private fontStyle: ITextLayoutStyle;

    

    @computed public get value() {
        return this.textValue;
    }

    public set value(textValue: string | undefined) {
        this.textValue = textValue;
        this.width = measureText(textValue, this.fontStyle);
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
        super({}, fontStyle.margin);
        this.fontStyle = fontStyle;
        this.height = fontStyle.lineHeight;
        this.textAnchor = this.fontStyle.textAnchor ? this.fontStyle.textAnchor : "start";



        // if (fontStyle.margin) {
        //     if (fontStyle.margin.left !== undefined) {
        //         this.marginLeft = fontStyle.margin.left;
        //     }
        //     if (fontStyle.margin.right !== undefined) {
        //         this.marginRight = fontStyle.margin.right;
        //     }
        //     if (fontStyle.margin.top !== undefined) {
        //         this.marginTop = fontStyle.margin.top;
        //     }
        //     if (fontStyle.margin.bottom !== undefined) {
        //         this.marginBottom = fontStyle.margin.bottom;
        //     }
        // }

        this.value = text;
    }


}