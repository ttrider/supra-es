import ISectionGroupInfo from './ISectionGroupInfo';

export default interface ISectionSetInfo {
    // #region Properties (5)

    sectionGroups: ISectionGroupInfo[];
    sectionPanelWidth: number;
    selectAll: (e?: React.MouseEvent) => void;
    selectorHeaderTitle: string;
    selectorWidth: number;

    // #endregion Properties (5)
}


