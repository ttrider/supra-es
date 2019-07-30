

export const lineHeight = 50;
export const gapWidth = 20;

export const nodePaddingSmall = 10;

export const nodePaddingMedium = 30;

export const iconSize = 180;

export const rowMargin = 75;
export const columnMargin = 50;
export const connectorMargin = 50;

export const layoutPadding = 50;


export interface ICanvasLayoutProvider {

    getCanvasLayout(): ICanvasLayout;

}
export interface ICanvasLayout {

    width: number;
    height: number;

    nodeLayouts: { [id: string]: INodeLayout };
}

export interface INodeLayoutProvider {

    id: string;

    columnIndex: number;

    rowIndex: number;

    getNodeLayout(): INodeLayout;
}

export interface INodeLayout {
    id: string;
    provider: INodeLayoutProvider;
    classes: { [name: string]: any };

    x: number;
    y: number;
    width: number;
    height: number;
    outerWidth: number;
    outerHeight: number;
    cost: INodeCostLayout;
    timings: ITimingsLayout;
    title: ITitleLayout;
    properties: IPropertiesLayout;
    connectors: IConnectorsLayout;

    outConnector: IPosition;
}

export interface INodeCostLayout {
    text: string;
    x: number;
    y: number;
}



export interface ISize {
    width: number;
    height: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface ISizeProvider {

    getSize(expanded?: boolean): ISize;
}

export interface ILayoutItemProvider<T> {

    getItemLayout(maxWidth: number, top: number, expanded?: boolean): T;

}

export interface IValue {
    label: string;
    value: string;
    subValue: string;
}

export interface ITimingsLayout {
    iconHeight: number;
    iconWidth: number;
    x: number;
    y: number;
    textY: number,
    labelX: number;
    valueX: number;
    lineHeight: number;

    values: IValue[]
}

export interface ITitleLayout {
    top: number;
    height: number;
    width: number;
    title: string;
    subtitle: string[];
}

export interface IPropertiesLayout {
    top: number;
    expanded: boolean;
    columnWidth: number[];
    columnPositions: number[],
    rows: IPropertiesRow[]
}

export interface IPropertiesRow {

    columns: string[];
    spanString: string;
}


export interface IConnectorsLayout {

    height: number;
    width: number;

    connectors: IConnector[];
}

export interface IConnector {
    id: string,
    title: string,
    titleWidth: number,
    x: number,
    y: number,

    geometry: string;
}

