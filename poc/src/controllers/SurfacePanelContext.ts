import { computed } from 'mobx';
import { measureText } from 'src/helpers/measure-text';
import ISurfaceController from 'src/models/ISurfaceController';
import styles from 'src/surface/styles';
import SurfacePanelLayout from './panels/SurfacePanelLayout';




export default class SurfacePanelContext {
    // #region Properties (1)

    public readonly titleWidth: number;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(public readonly controller: ISurfaceController,
        public readonly panel: SurfacePanelLayout
    ) {
        this.titleWidth = measureText(this.title, styles.panelTitle) + styles.panelTitle.padding.left * 4
    }

    // #endregion Constructors (1)

    // #region Public Accessors (7)

    @computed public get height() { return this.panel.height; }

    public get key() { return this.panel.title; }

    public get title() { return this.panel.title; }

    @computed public get titleLeft() {
        const viewportLeft = this.controller.viewportLeft;
        const viewportRight = this.controller.viewportRight;

        const panelLeft = this.panel.x;
        const panelRight = this.panel.x + this.width;

        if (panelRight < viewportLeft || panelLeft > viewportRight) {
            // not on the screen
            return 0;
        }

        if (panelLeft < viewportLeft) {
            const rightEdge = panelRight - viewportLeft;
            const labelWidth = this.titleWidth;

            if (rightEdge > labelWidth) {
                return viewportLeft - panelLeft + styles.panelTitle.padding.left;
            } else {
                return rightEdge - labelWidth;
            }
        }

        return styles.panelTitle.padding.left;
    }

    @computed public get titleTop() {
        return this.controller.viewportBottom;
    }

    public get top() { return 0; }

    @computed public get width() { return this.panel.width; }

    // #endregion Public Accessors (7)
}
