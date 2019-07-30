import { forEachItem, ItemSet } from 'src/helpers';
import styles from 'src/surface/styles';
import Layout from './Layout';
import TextLayout from './TextLayout';


export interface IPropertiesRow {
    columns: string[];
    description?: string;
    help?: string;
}

export default class PropertiesLayout extends Layout {

    public headers: TextLayout[] = [];

    public groups: Array<{
        title?: TextLayout,

        rows: IPropertiesGroupRow[]
    }> = [];


    constructor() {
        super(
            {},
            {
                left: styles.node.padding.left,
                right: styles.node.padding.left,
            }
        )
    }
}


export function propertiesBuilder() {
    return new PropertiesBuilder();
}


export declare interface IPropertiesGroupRow {

    columns: TextLayout[],
    description?: TextLayout,
    help?: string,
    rowLayout: Layout,
}

// tslint:disable-next-line:max-classes-per-file
class PropertiesBuilder {

    private headers: TextLayout[] = [];

    private groups: Array<{
        title?: TextLayout,

        rows: IPropertiesGroupRow[]
    }> = [];



    public setHeader(...headers: Array<string | string[]>) {

        forEachItem(headers, header => this.headers.push(new TextLayout(header, styles.nodePropertiesHeader)));

        return this;
    }


    public addRow(groupName: string | undefined | null, ...rows: ItemSet<IPropertiesRow | string>) {

        const group = this.getGroup(groupName);

        // rows.forEach(item=>{
        forEachItem(rows, (item => {

            const row: IPropertiesGroupRow = {
                ...((Array.isArray(item))
                    ? { columns: item.map(i => new TextLayout(i, styles.nodePropertiesValue)) }
                    : (
                        (typeof item === "string")
                            ? { columns: [new TextLayout(item, styles.nodePropertiesValue)] }
                            : {
                                columns: item.columns.map(i => new TextLayout(i, styles.nodePropertiesValue)),
                                description: item.description ? new TextLayout(item.description, styles.nodePropertiesValue) : undefined,
                                help: item.help
                            }
                    )), rowLayout: new Layout()
            };


            group.rows.push(row);

        }));

        return this;
    }

    public build() {

        const columnSizes = this.headers.map(item => item.outerWidth);

        this.groups.reduce((sizes, g) => {
            return g.rows.reduce((sz, row) => {
                for (let index = 0; index < row.columns.length; index++) {
                    const columnValue = row.columns[index];
                    sz[index] = Math.max(columnValue.outerWidth, sz[index] === undefined ? 0 : sz[index]);
                }
                return sz;
            }, sizes);

        }, columnSizes);

        const totalWidth = columnSizes.reduce((s, i) => s += i, 0);


        let currentTop = 0;
        let currentLeft = 0;
        let headerBottom = 0;
        for (let index = 0; index < this.headers.length; index++) {
            const columnSize = columnSizes[index];
            const header = this.headers[index];

            header.y = currentTop;
            if (index === 0) {
                header.x = 0;
            } else {

                header.x = currentLeft + columnSize;
                header.style = { textAnchor: "end" };
            }

            currentLeft += columnSize;
            headerBottom = header.outerBottom;
        }
        currentTop = headerBottom;

        let showBack = false;
        for (const group of this.groups) {

            if (group.title) {
                group.title.y = currentTop;
                currentTop = group.title.outerBottom;
            }

            for (const row of group.rows) {

                currentLeft = 0;
                let nextTop = currentTop;

                if (showBack) {
                    row.rowLayout.x = currentLeft;
                    row.rowLayout.y = currentTop;
                    row.rowLayout.marginTop = styles.nodePropertiesBack.margin.top;
                }

                for (let index = 0; index < row.columns.length; index++) {
                    const columnSize = columnSizes[index];
                    const columnValue = row.columns[index];

                    columnValue.y = currentTop;
                    if (index === 0) {
                        columnValue.x = 0;
                        nextTop = columnValue.outerBottom;
                    } else {

                        columnValue.x = currentLeft + columnSize - styles.nodePropertiesValue.margin.left;
                        columnValue.style = { textAnchor: "end" };
                    }

                    currentLeft += columnSize;
                }
                currentTop = nextTop;

                if (row.description) {
                    row.description.y = currentTop;
                    currentTop = row.description.outerBottom;
                    row.description.x = currentLeft - styles.nodePropertiesValue.margin.left;
                    row.description.style = { textAnchor: "end" };
                }

                if (showBack) {
                    row.rowLayout.height = currentTop - row.rowLayout.y;
                    row.rowLayout.width = totalWidth;
                }
                showBack = !showBack;
            }
        }

        const pl = new PropertiesLayout();
        pl.width = totalWidth;
        pl.height = currentTop;
        pl.headers = this.headers;
        pl.groups = this.groups;
        return pl;
    }

    private getGroup(title?: string | null) {

        if (!title) {
            let topGroup = this.groups.find(g => !g.title || !g.title.value);
            if (!topGroup) {
                topGroup = { rows: [] };
                this.groups.push(topGroup);
            }
            return topGroup;
        }

        let group = this.groups.find(g => (g.title !== undefined) && (title === g.title.value));
        if (!group) {
            group = { title: new TextLayout(title, styles.nodePropertiesGroupTitle), rows: [] };
            this.groups.push(group);
        }
        return group;
    }
}