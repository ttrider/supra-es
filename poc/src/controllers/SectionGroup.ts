import { action, autorun, computed, observable } from 'mobx';

import styles from 'src/controllers/styles';
import ISectionGroupInfo from "src/models/ISectionGroupInfo";
import Section from './Section';
import SectionSet from './SectionSet';

export default class SectionGroup<TSection> implements ISectionGroupInfo {
    // #region Properties (5)

    @observable public sectionSet: SectionSet<TSection>;
    @observable public sections: Array<Section<TSection>> = [];


    @observable public selectorHeight: number = 0;
    @observable public selectorTop: number = 0;

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(sections: Array<Section<TSection>>) {
        this.sections = sections.map(item => {
            item.surfaceGroup = this;
            return item;
        });

        // when the number or the size of the sections changes
        // we need to reposition them
        autorun((r) => {
            let top = 0;

            for (const section of this.sections) {
                section.selectorTop = top;
                top += section.selectorHeight + styles.selector.margin.bottom;
            }

            this.selectorHeight = top + styles.selector.margin.bottom;

        });
    }

    // #endregion Constructors (1)

    // #region Public Accessors (3)

    @computed public get absoluteWeight() {
        return this.sections.reduce((s, i) => {
            s += i.rootNode.absoluteWeight;
            return s;
        }, 0);
    }

    @computed public get selectedAbsoluteWeight() {
        return this.sections.reduce((s, i) => {
            if (i.selected) {
                s += i.rootNode.absoluteWeight;
            }
            return s;
        }, 0);
    }

    @computed public get selectedSections(): Array<Section<TSection>> {
        return this.sections.reduce((s, i) => {
            if (i.selected) {
                s.push(i);
            }
            return s;
        }, [] as Array<Section<TSection>>);
    }

    // #endregion Public Accessors (3)

    // #region Private Methods (1)
    public selectAll = (e?: React.MouseEvent) => {
        if (e) {
            this.selectAllHandler();
            e.preventDefault();
            e.stopPropagation();

        } else {
            this.selectAllHandler();
        }
    }
    @action private selectAllHandler() {
        for (const section of this.sections) {
            section.selected = true;
        }
    }

    // #endregion Private Methods (1)
}