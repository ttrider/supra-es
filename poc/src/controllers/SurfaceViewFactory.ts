import { action, observable } from 'mobx';
import ISelectable from "src/models/ISelectable";
import ISurfaceViewFactory from '../models/ISurfaceViewFactory';
import SurfaceController from './SurfaceController';
import SurfaceView from './SurfaceView';

export default class SurfaceViewFactory<T, TSection> implements ISurfaceViewFactory<T>, ISelectable {

    public get id() {
        return this.properties.id;
    }
    public get title() {
        return this.properties.title;
    }

    @observable public selected: boolean = false;


    private view?: SurfaceView;

    constructor(private owner: SurfaceController<T, TSection>, private properties: ISurfaceViewFactory<T>) {
    }

    public createView(data: T) {

        if (this.view !== undefined) {
            return this.view;
        }
        this.view = this.properties.createView(data);

        // add additional properties here

        return this.view;
    }
    public resetView() {
        this.view = undefined;
    }

    public select = (e?: React.MouseEvent) => {

        if (e) {

            this.selectHandler();

            e.preventDefault();
            e.stopPropagation();
        } else {
            this.selectHandler();
        }
    }
    @action public selectHandler() {

        for (const view of this.owner.views) {
            if (view === this) {
                if (!view.selected) {
                    view.selected = true;

                }
            } else {
                if (view.selected) { view.selected = false; }
            }
        }
    }
}


