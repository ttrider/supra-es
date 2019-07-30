const cache: { [name: string]: number } = {};
const contexts: { [name: string]: CanvasRenderingContext2D } = {};
let canvas: HTMLCanvasElement;

export interface IFontStyle { fontFamily: string, fontSize: number, fontWeight?: string };

export function measureText(text: string | undefined, fontStyle: IFontStyle) {
    if (text === undefined) {
        return 0;
    }

    const font = `${fontStyle.fontWeight ? "bold " : ""}${fontStyle.fontSize}px ${fontStyle.fontFamily}`;
    const cacheKey = font + ":" + text;
    const cacheValue = cache[cacheKey];
    if (cacheValue !== undefined) {
        return cacheValue;
    }

    let context = contexts[font];
    if (context === undefined) {

        if (canvas === undefined) {
            canvas = document.createElement("canvas");
        }

        const c = canvas.getContext("2d");
        if (!c) {
            return 0;
        }
        c.font = font;

        context = contexts[font] = c;
    }

    const width = cache[cacheKey] = context.measureText(text).width;
    return width;
}