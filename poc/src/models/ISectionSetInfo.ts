import ISectionGroupInfo from './ISectionGroupInfo';

export default interface ISectionSetInfo {
    // #region Properties (5)

    sectionGroups: ISectionGroupInfo[];
    panelRight: number;
    selectAll: (e?: React.MouseEvent) => void;
    selectorHeaderTitle: string;
    selectorWidth: number;

    // #endregion Properties (5)
}


