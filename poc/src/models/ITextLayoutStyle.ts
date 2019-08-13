export interface ITextLayoutStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight?: string;
    lineHeight: number;
    // textAnchor?: string; // "end" | "start" | "middle",
    textAnchor?: "end" | "start" | "middle";
    margin?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
}
