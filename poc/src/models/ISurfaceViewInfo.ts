import ISelectable from './ISelectable';

export default interface ISurfaceViewInfo extends ISelectable{
    readonly id: string;
    readonly title: string;
}
