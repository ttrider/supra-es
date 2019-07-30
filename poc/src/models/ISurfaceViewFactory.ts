import SurfaceView from "../controllers/SurfaceView";
export default interface ISurfaceViewFactory<T> {
    readonly id: string;
    readonly title: string;
    readonly createView: (data: T) => SurfaceView;
}



