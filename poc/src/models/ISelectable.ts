export default interface ISelectable {
    selected: boolean;
    select: (e?: React.MouseEvent) => void;
}
