import { autorun, computed, IReactionDisposer, observable } from 'mobx';
import Layout from 'src/controllers/layout/Layout';
import IPanelLocation from 'src/models/IPanelRect';
export default class SurfacePanelLayout extends Layout implements IPanelLocation {

    // #region Properties (7)

    @observable public alignment: "left" | "right";
    @observable public key: string;

    public index: number;

    public title: string;

    public name: string;

    @computed public get panelBottom() {
        return this.outerBottom;
    }

    @computed public get panelRight() {
        return this.outerRight;
    }

    @computed public get panelLeft() {
        return this.outerLeft;
    }

    @computed public get panelTop() {
        return this.outerTop;
    }
    private autoHandler: IReactionDisposer;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(title: string, alignment: "left" | "right", width: number, height: number) {
        super();
        this.key = title;
        this.title = title;
        this.alignment = alignment;
        this.width = width;
        this.height = height;
        this.index = 0;
        this.name = this.constructor.name;
    }

    // #endregion Constructors (1)

    public initialize(index: number, prevPanel: IPanelLocation | null) {
        this.index = index;

        if (prevPanel) {

            if (this.autoHandler !== undefined) {
                this.autoHandler();
            }

            this.autoHandler = autorun(() => {

                this.x = prevPanel.panelRight;
            })
        }

        return this;
    }

}
