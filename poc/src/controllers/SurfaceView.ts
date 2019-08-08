import { observable } from 'mobx';
import SurfacePanelLayout from 'src/controllers/panels/SurfacePanelLayout';

export default class SurfaceView {
    public data: any;
    @observable public panels: SurfacePanelLayout[] = observable([]);
    
    constructor(data: any) {
        this.data = data;
    }

    
    public addPanel(...panels: SurfacePanelLayout[]) {

        for (const panel of panels) {

            if (this.panels.length === 0) {
                this.panels.push(panel);
            } else {

                const rightPanel = this.panels[this.panels.length - 1];

                this.panels.push(panel.initialize(this.panels.length, rightPanel))
            }
        }

        return this;
    }
}
