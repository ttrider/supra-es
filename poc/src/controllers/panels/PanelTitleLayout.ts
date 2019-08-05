import { autorun } from 'mobx';
import styles from 'src/controllers/styles';
import ISurfaceController from 'src/models/ISurfaceController';
import TextLayout from '../layout/TextLayout';
import SurfacePanelLayout from './SurfacePanelLayout';



export default class PanelTitleLayout extends TextLayout {

    constructor(private controller: ISurfaceController, public panel: SurfacePanelLayout) {
        super(panel.title, styles.panelTitle);

        autorun(() => {


            const viewportLeft = this.controller.viewportLeft;
            const viewportRight = this.controller.viewportRight;

            const panelLeft = this.panel.x;
            const panelRight = this.panel.x + this.width;

            if (panelRight < viewportLeft || panelLeft > viewportRight) {
                // not on the screen
                this.x = panelLeft;
            } else if (panelLeft < viewportLeft) {
                const rightEdge = panelRight - viewportLeft;
                const labelWidth = this.width;

                if (rightEdge > labelWidth) {
                    this.x = panelLeft + (viewportLeft - panelLeft + styles.panelTitle.padding.left);
                } else {
                    this.x = panelLeft + (rightEdge - labelWidth);
                }
            } else {
                this.x = panelLeft + styles.panelTitle.padding.left;
            }

            this.y = this.panel.y + this.controller.viewportBottom - this.outerHeight;
        });
    }
}