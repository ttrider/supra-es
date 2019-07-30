import SurfacePanelLayout from './SurfacePanelLayout';

export default class TextPanelLayout extends SurfacePanelLayout {

    constructor(prevPanel: SurfacePanelLayout | null, title:string) {

        super(prevPanel, title, "left", 1500, 4000);

    }
}