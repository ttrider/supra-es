import { IFontStyle } from '../models/IFontStyle';

const cache: { [name: string]: number } = {};
const contexts: { [name: string]: CanvasRenderingContext2D } = {};

const ellipsis = "⋯";


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

        const canvas2 = document.createElement("canvas");
        const c = canvas2.getContext("2d");
        if (!c) {
            return 0;
        }
        c.font = font;

        context = contexts[font] = c;
    }

    return cache[cacheKey] = context.measureText(text).width;
}

export function fitText(text: string | undefined, fontStyle: IFontStyle, maxWidth: number, mode: "start-ellipsis" | "mid-ellipsis" | "end-ellipsis") {

    if (text === undefined) {
        return {
            originalText: "",
            originalWidth: 0,
            transformedText: "",
            transformedWidth: 0,
            maxWidth,
            mode
        }
    }

    const originalText = text;
    const originalWidth = measureText(text, fontStyle);
    let transformedText = originalText;
    let transformedWidth = originalWidth;

    if (maxWidth && originalWidth > maxWidth) {

        const elWidth = measureText(ellipsis, fontStyle);
        const mWidth = maxWidth - elWidth;

        let handler: (chars: number) => { parts: Array<string | undefined>, width: number };

        switch (mode) {
            case "start-ellipsis":
                handler = startEllipsis;
                break;
            case "mid-ellipsis":
                handler = midEllipsis;
                break;
            case "end-ellipsis":
            default:
                handler = endEllipsis;
                break;
        }

        while (transformedWidth > maxWidth) {
            const chars = Math.floor((transformedText.length * mWidth) / transformedWidth);

            const transformed = handler(chars - 1);
            transformedText = transformed.parts.join(ellipsis);
            transformedWidth = transformed.width;
        }
    }

    return {
        originalText,
        originalWidth,
        transformedText,
        transformedWidth,
        fontStyle,
        maxWidth,
        mode
    }

    function startEllipsis(chars: number) {

        const part = originalText.substr(-chars, chars);
        const ret =
        {
            parts: [undefined, part],
            width: measureText(part, fontStyle)
        }
        return ret;
    }

    function midEllipsis(chars: number) {

        const leftChars = chars / 2;
        const rightChars = chars - leftChars;

        const right = originalText.substr(-leftChars, leftChars);
        const left = originalText.substr(0, rightChars);

        const ret =
        {
            parts: [left, right],
            width: measureText(left, fontStyle) + measureText(right, fontStyle)
        }
        return ret;
    }

    function endEllipsis(chars: number) {
        const part = originalText.substring(0, chars);
        const ret =
        {
            parts: [part, undefined],
            width: measureText(part, fontStyle)
        }
        return ret;
    }
}