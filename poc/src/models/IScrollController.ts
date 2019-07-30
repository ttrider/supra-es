export default interface IScrollController {
    readonly scrollLeft: number;
    readonly scrollTop: number;
    readonly scrollClientWidth: number;
    readonly scrollClientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;

    readonly viewportLeft: number;
    readonly viewportTop: number;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    readonly viewportRight: number;
    readonly viewportBottom: number;
    readonly width: number;
    readonly height: number;

    readonly viewWidth: number;
    readonly viewHeight: number;
    readonly viewRatio: number;
    readonly onScrollEvent: (left: number, top: number, width: number, height: number, clientWidth: number, clientHeight: number)=> void;
}


