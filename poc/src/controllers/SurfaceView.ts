import { observable } from 'mobx';
import SurfacePanelLayout from 'src/controllers/panels/SurfacePanelLayout';

export default class SurfaceView {
    public data: any;
    @observable public panels: SurfacePanelLayout[] = observable([]);
    constructor(data: any) {
        this.data = data;
    }
}
