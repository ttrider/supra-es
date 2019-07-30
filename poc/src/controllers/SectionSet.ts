import { action, autorun, computed, observable } from 'mobx';

import ISectionSetInfo from 'src/models/ISectionSetInfo';
import styles from 'src/surface/styles';
import SurfaceGraphRootNode from './panels/GraphRootNode';
import Section from './Section';
import SectionGroup from './SectionGroup';

export default class SectionSet<TSection> implements ISectionSetInfo {
    // #region Properties (2)

    @observable public sectionGroups: Array<SectionGroup<TSection>>;
    

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sectionGroups: Array<SectionGroup<TSection>>) {
        
        this.sectionGroups = sectionGroups.map(item => {
            item.sectionSet = this;
            return item;
        });

        // ensure that we have at least one section selected

        autorun(() => {
            
            let hasSelected = false;
            let top = 0;


            for (const sectionGroup of this.sectionGroups) {

                if (!hasSelected && sectionGroup.selectedSections.length > 0) {
                    hasSelected = true;
                }

                sectionGroup.selectorTop = top;
                top += sectionGroup.selectorHeight + styles.selector.margin.bottom;
            }

            if (!hasSelected) {
                this.selectFirstSection();
            }

        });
    }

    // #endregion Constructors (1)

    // #region Public Accessors (7)

    @computed public get absoluteWeight() {
        return this.sectionGroups.reduce<number>((s, i) => {
            s += i.absoluteWeight;
            return s;
        }, 0);
    }

    @computed public get sectionPanelWidth() {
        let width = 0;
        for (const sectionGroup of this.sectionGroups) {
            for (const section of sectionGroup.sections) {
                width = Math.max(section.rootNode.width);
            }
        }
        return width;
    }

    @computed public get selectedAbsoluteWeight() {
        return this.sectionGroups.reduce<number>((s, i) => {
            s += i.selectedAbsoluteWeight;
            return s;
        }, 0);
    }

    @computed public get selectedSections() {
        return this.sectionGroups.reduce<Array<Section<TSection>>>((s, i) => {
            s.push(...i.selectedSections);
            return s;
        }, []);
    }

    @computed public get selectorHeaderTitle() {
        const sectionsCount = this.sectionGroups.reduce<number>((s, i) => (s = s + i.sections.length), 0);
        const selectedSectionsCount = this.selectedSections.length;

        if (selectedSectionsCount > 1) {
            return `${sectionsCount} [${selectedSectionsCount}] sections`;
        } else {
            return `${sectionsCount} sections`;
        }
    }

    @computed public get selectorHeight() {
        let height = 0;

        for (const sectionGroup of this.sectionGroups) {
            height += sectionGroup.selectorHeight + styles.selector.margin.bottom;
        }

        return height;
    }

    @computed public get selectorWidth() {
        return styles.selector.width;
    }

    // #endregion Public Accessors (7)

    @action public selectFirstSection() {
        for (const group of this.sectionGroups) {
            if (group.sections.length > 0) {
                 group.sections[0].selected = true;
                return;
            }
        }
    }

    // #region Private Methods (1)

    public selectAll: (e?: React.MouseEvent) => void = (e?: React.MouseEvent) => {
        if (e) {
            this.selectAllHandler();
            e.preventDefault();
            e.stopPropagation();

        } else {
            this.selectAllHandler();
        }
    }

    @action private selectAllHandler() {
        for (const sectionGroup of this.sectionGroups) {
            sectionGroup.selectAll();
        }
    }

    // #endregion Private Methods (1)
}

export function createSectionSet<TSection>(sections: Array<Array<SurfaceGraphRootNode<TSection>> | SurfaceGraphRootNode<TSection>>) {
    return new SectionSet<TSection>(
        sections.map(
            sectionOrGroup => {
                return new SectionGroup(((Array.isArray(sectionOrGroup) ? sectionOrGroup : [sectionOrGroup]).map(item => new Section<TSection>(item))));
            }
        )
    );
}