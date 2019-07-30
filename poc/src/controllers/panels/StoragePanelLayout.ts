import SurfacePanelLayout from './SurfacePanelLayout';

export default class StoragePanelLayout extends SurfacePanelLayout {


    constructor(prevPanel: SurfacePanelLayout | null) {

        super(prevPanel, "Storage", "right", 1500, 4000);

    }

}