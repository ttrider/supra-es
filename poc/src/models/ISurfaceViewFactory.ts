import SurfaceView from "../controllers/SurfaceView";
export default interface ISurfaceViewFactory<T, TSection> {
    readonly id: string;
    readonly title: string;
    readonly createView: (data: T, selected: TSection[]) => SurfaceView;
}



