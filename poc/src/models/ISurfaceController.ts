

import PanelTitleLayout from 'src/controllers/panels/PanelTitleLayout';
import SurfacePanelLayout from 'src/controllers/panels/SurfacePanelLayout';
import IScrollController from './IScrollController';
import ISectionSetInfo from './ISectionSetInfo';
import ISize from './ISize';
import ISurfaceViewInfo from './ISurfaceViewInfo';

export default interface ISurfaceController extends IScrollController{
    // #region Properties (5)

    panels: SurfacePanelLayout[];

    panelTitles: PanelTitleLayout[];

    sections?: ISectionSetInfo;
    
    surfacesize: ISize;
    views: ISurfaceViewInfo[];

    // #endregion Properties (5)

    // #region Methods (1)

    showPanel(panelId: string): void;

    // #endregion Methods (1)
}
