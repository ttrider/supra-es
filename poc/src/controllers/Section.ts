import { action, computed, observable } from 'mobx';


import { formatCost } from 'src/helpers/formatter';
import ISectionInfo from "src/models/ISectionInfo";
import SurfaceGraphRootNode from './panels/GraphRootNode';
import SectionGroup from './SectionGroup';

export default class Section<TSection> implements ISectionInfo {

    @observable public rootNode: SurfaceGraphRootNode<TSection>;

    public surfaceGroup: SectionGroup<TSection>;

    @observable public selected: boolean = false;

    @computed public get id() {
        return this.rootNode.id;
    }

    @computed public get relativeWeight() {
        return this.rootNode.absoluteWeight / this.surfaceGroup.sectionSet.absoluteWeight;
    }

    @computed public get cost() {
        return formatCost(this.relativeWeight);
    }

    @computed public get selectorHeight() {
        return this.rootNode.height;
    }


    @observable public selectorTop: number = 0;

    constructor(rootNode: SurfaceGraphRootNode<TSection>) {
        this.rootNode = rootNode;
    }

    public select = (e?: React.MouseEvent) => {

        if (e) {

            if (e.shiftKey) {
                this.toggleHandler();
            } else {
                this.selectHandler();
            }

            e.preventDefault();
            e.stopPropagation();
        } else {
            this.selectHandler();
        }
    }
    @action public selectHandler() {

        // if (this.selected) {
        //     return;
        // }

        for (const group of this.surfaceGroup.sectionSet.sectionGroups) {

            for (const section of group.sections) {

                if (section === this) {
                    section.selected = true;
                } else {
                    section.selected = false;
                }
            }
        }
    }

    public toggle = (e?: React.MouseEvent) => {
        this.toggleHandler();
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    @action public toggleHandler() {
        this.selected = !this.selected;
    }

}