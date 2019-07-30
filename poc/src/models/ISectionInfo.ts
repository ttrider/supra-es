
import IGraphNode  from './IGraphNode';
import ISelectable from './ISelectable';
export default interface ISectionInfo extends ISelectable {
    // #region Properties (6)

    cost: string;
    id: string;
    rootNode: IGraphNode;
    selectorHeight: number;
    selectorTop: number;
    toggle: (e?: React.MouseEvent) => void;

    // #endregion Properties (6)
}
