import { action, computed } from 'mobx';
import Layout from 'src/controllers/layout/Layout';
import { measureText } from '../helpers/measure-text';
import { ISurfacePropertyRow } from '../models/ISurfacePropertyRow';
import styles from './styles';

// tslint:disable:max-classes-per-file

export class SurfaceProperties {

    public headers: string[] = [];

    public groups: SurfacePropertyGroup[] = [];

    public get rows() {

        return this.groups.reduce<ISurfacePropertyRow[]>((rows, group) => {
            rows.push(...group.rows);
            return rows;
        }, []);
    }


    public createGroup(title?: string) {
        const group = new SurfacePropertyGroup(title);
        this.groups.push(group);
        return group;
    }


    @action public updateLayout(propertiesLayout: Layout) {
        
        const dimentions = this.dimentions;
        propertiesLayout.width = dimentions.width;
        propertiesLayout.height = dimentions.height;
    }

    @computed.struct public get dimentions() {

        const headerDimentions = this.headers.map(item => measureText(item, styles.nodePropertiesHeader));

        const columnWidth = this.rows.reduce((data, item) => {

            for (let index = 0; index < item.columns.length; index++) {

                const columnValue = item.columns[index];
                data.columns[index] = Math.max(measureText(columnValue, styles.nodePropertiesValue), data.columns[index] === undefined ? 0 : data.columns[index]);
            }

            data.description = Math.max(data.description, measureText(item.description, styles.nodePropertiesValue));
            if (item.description) {
                data.descriptionCount++;
            }
            data.rowCount++;

            return data;
        }, { columns: headerDimentions, description: 0, rowCount: 0, descriptionCount: 0 });

        return {
            height:
                // group titles
                this.groups.filter(i => i.title).length * styles.nodePropertiesGroupTitle.lineHeight +
                // rows
                columnWidth.rowCount * styles.nodePropertiesValue.lineHeight +
                // description rows
                columnWidth.descriptionCount * styles.nodePropertiesValue.lineHeight,

            width: columnWidth.columns.reduce((sum, item) => sum + item, 0),
            columnWidth
        };
    }
}


export class SurfacePropertyGroup {

    public rows: ISurfacePropertyRow[] = [];

    constructor(public title?: string) { }

    public addRow(...columns: string[]) {
        const row = {
            columns
        } as ISurfacePropertyRow;
        this.rows.push(row);
        return row;
    }

}

