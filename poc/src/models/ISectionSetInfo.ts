import IPanelLocation from './IPanelRect';
import ISectionGroupInfo from './ISectionGroupInfo';

export default interface ISectionSetInfo extends IPanelLocation {
    // #region Properties (5)

    sectionGroups: ISectionGroupInfo[];
    
    selectAll: (e?: React.MouseEvent) => void;
    selectorHeaderTitle: string;
    selectorWidth: number;

    // #endregion Properties (5)
}


