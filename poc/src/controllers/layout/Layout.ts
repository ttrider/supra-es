import { computed, observable } from 'mobx';

export default class Layout {
    public id?: string;
    @observable public x: number = 0;
    @observable public y: number = 0;
    @observable public width: number = 0;
    @observable public height: number = 0;

    @observable public marginLeft: number = 0;
    @observable public marginRight: number = 0;
    @observable public marginTop: number = 0;
    @observable public marginBottom: number = 0;


    @computed public get outerLeft() {
        return this.x;
    }
    @computed public get outerTop() {
        return this.y;
    }
    @computed public get outerWidth() {
        const ret =

            this.marginLeft +

            this.width +

            this.marginRight;
        return ret;
    }

    @computed public get outerHeight() {
        const ret =

            this.marginTop +

            this.height +

            this.marginBottom;
        return ret;
    }

    @computed public get outerRight() {
        return this.outerLeft + this.outerWidth;
    }
    @computed public get outerBottom() {
        return this.outerTop + this.outerHeight;
    }

    @computed public get clientLeft() {
        return this.x + this.marginLeft;
    }
    @computed public get clientTop() {
        return this.y + this.marginTop;
    }
    @computed public get clientWidth() {
        return this.width;
    }

    @computed public get clientHeight() {
        return this.height;
    }

    @computed public get clientRight() {
        return this.clientLeft + this.clientWidth;
    }

    @computed public get clientBottom() {
        return this.clientTop + this.clientHeight;
    }

    public style: React.CSSProperties | undefined;

    public get outline() {
        return {
            x: this.outerLeft,
            y: this.outerTop,
            width: this.outerWidth,
            height: this.outerHeight,
            style: this.style
        }
    }


    public get client() {
        return {
            x: this.clientLeft,
            y: this.clientTop,
            width: this.clientWidth,
            height: this.clientHeight,
            style: this.style
        }
    }

    public get textClient() {
        return {
            x: this.clientLeft,
            y: this.clientTop + this.clientHeight,
            style: this.style
        }
    }

    public get transform() {
        return `translate(${this.outerLeft}, ${this.outerTop})`;
    }



    constructor(
        location?: { x?: number, y?: number, width?: number, height?: number },
        margin?: { left?: number, top?: number, right?: number, bottom?: number }
    ) {

        if (location) {
            this.x = location.x ? location.x : 0;
            this.y = location.y ? location.y : 0;
            this.width = location.width ? location.width : 0;
            this.height = location.height ? location.height : 0;
        }

        if (margin) {
            this.marginLeft = margin.left ? margin.left : 0;
            this.marginRight = margin.right ? margin.right : 0;
            this.marginTop = margin.top ? margin.top : 0;
            this.marginBottom = margin.bottom ? margin.bottom : 0;
        }
    }
}
