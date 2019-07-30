

export interface ILayout {



    trees: ILayoutTree[]

}

export interface ILayoutTree {



    root: ILayoutNode;

}


export interface ILayoutNode {

    output: string;

    metrics: ILayoutMetrics[];



}

export interface ILayoutMetrics {
    name: string;
    value: string;
    description?: string;
    marked?: boolean;
}