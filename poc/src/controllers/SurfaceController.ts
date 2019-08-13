import anime from 'animejs';
import { action, computed, observable } from 'mobx';
import ISurfaceController from 'src/models/ISurfaceController';

import ISize from 'src/models/ISize';
import ISurfaceViewFactory from "../models/ISurfaceViewFactory";
import PanelTitleLayout from './panels/PanelTitleLayout';
import SectionSet from './SectionSet';
// import SurfaceView from './SurfaceView';
import SurfaceViewFactory from './SurfaceViewFactory';

// tslint:disable:no-console


export default class SurfaceController<T, TSection = T> implements ISurfaceController {

    @observable public scrollLeft: number = 0;
    @observable public scrollTop: number = 0;
    @observable public scrollClientWidth: number = 0;
    @observable public scrollClientHeight: number = 0;
    @observable public scrollWidth: number = 0;
    @observable public scrollHeight: number = 0;

    @observable public viewRatio: number = 0.20;


    @computed public get viewportLeft() {
        return this.scrollLeft / this.viewRatio;
    }
    @computed public get viewportTop() {
        return this.scrollTop / this.viewRatio;
    }
    @computed public get viewportWidth() {
        return this.scrollClientWidth / this.viewRatio;
    }
    @computed public get viewportHeight() {
        return this.scrollClientHeight / this.viewRatio;
    }
    @computed public get viewportRight() {
        return (this.scrollLeft + this.scrollClientWidth) / this.viewRatio;
    }
    @computed public get viewportBottom() {
        return (this.scrollTop + this.scrollClientHeight) / this.viewRatio;
    }

    @computed public get width() {
        if (!this.currentView) { return 0; }
        return Math.max(this.surfacesize.width * this.viewRatio, this.scrollClientWidth - 10);
    }
    @computed public get height() {
        if (!this.currentView) { return 0; }
        return Math.max(this.surfacesize.height * this.viewRatio, this.scrollClientHeight - 10);
    }

    @computed public get viewWidth() {
        if (!this.currentView) { return 0; }
        return Math.max(this.surfacesize.width, (this.scrollClientWidth - 10) / this.viewRatio);
    }
    @computed public get viewHeight() {
        if (!this.currentView) { return 0; }
        return Math.max(this.surfacesize.height, (this.scrollClientHeight - 10) / this.viewRatio);
    }

    @computed public get surfacesize() {

        const sz = this.panels.reduce((size, item) => {

            size.height = Math.max(size.height, item.height);
            size.width += item.width;

            return size;
        }, { width: 0, height: this.sections ? this.sections.panelHeight : 0 } as ISize);

        return sz;
    }


    @computed public get panelTitles(): PanelTitleLayout[] {

        return this.panels.map<PanelTitleLayout>(panel => {
            return new PanelTitleLayout(this, panel);
        });
    }

    @computed public get panels() {
        return (this.currentView) ? this.currentView.panels : [];
    }

    @observable public views: Array<SurfaceViewFactory<T, TSection>> = [];

    @computed private get currentView() {
        const selectedViewFactory = this.selectedViewFactory;
        const selectedSectionsData = this.selectedSectionsData;
        const sections = this.sections;

        if (this.dataModel && selectedViewFactory && selectedSectionsData && sections) {
            const view = selectedViewFactory.createView(this.dataModel, selectedSectionsData);

            view.panels[0].initialize(0, sections);

            return view;
        }
        return;
    }

    @computed public get selectedViewFactory() {

        for (const viewFactory of this.views) {
            if (viewFactory.selected) {
                return viewFactory;
            }
        }
        return;
    }

    @computed public get selectedSectionsData() {

        const selected = this.sections
            ? this.sections.selectedSections.map(s => s.data)
            : [];

        return selected;
    }

    @computed public get data() {
        return this.dataModel;
    }

    public set data(newValue: T | undefined) {

        // detect fonts using document.fonts
        // when it is not available, (IE/Edge) - continue without checks :(
        const fonts = (document as any).fonts;
        if (fonts) {

            fonts.ready.then(() => {
                setData(this);
            }).catch(() => {
                setData(this);
            });

        } else {
            setData(this);
        }

        function setData(controller: SurfaceController<T, TSection>) {
            for (const viewFactory of controller.views) {
                viewFactory.resetView();
            }

            controller.sectionSet = undefined;

            controller.dataModel = newValue;
        }
    }

    @computed public get sections() {

        if (this.dataModel) {
            if (!this.sectionSet) {
                this.sectionSet = this.sectionFactory(this.dataModel);
            }
            return this.sectionSet;
        }
        return;
    }


    @observable private dataModel?: T;
    @observable private sectionSet?: SectionSet<TSection>;

    private sectionFactory: (data: T) => SectionSet<TSection>;

    @action public registerSectionFactory(factory: (data: T) => SectionSet<TSection>) {
        this.sectionFactory = factory;
        return this;
    }

    @action public registerViewFactory(factory: ISurfaceViewFactory<T, TSection>) {

        const vf = new SurfaceViewFactory(this, factory)
        this.views.push(vf);

        if (this.views.length === 1) {
            vf.select();
        }

        return this;
    }

    @action public onScrollEvent(left: number, top: number, width: number, height: number, clientWidth: number, clientHeight: number) {

        this.scrollLeft = left;
        this.scrollTop = top;
        this.scrollWidth = width;
        this.scrollHeight = height;
        this.scrollClientWidth = clientWidth;
        this.scrollClientHeight = clientHeight;
    }


    @action public showPanel(panelKey: string) {

        const panelItem = this.getPanel(panelKey);
        if (panelItem) {

            const left =
                (panelItem.index === 0)
                    ? 0
                    : (
                        (panelItem.alignment === "right")
                            ? (panelItem.x + panelItem.width) - this.viewportWidth
                            : panelItem.x);

            this.scrollView(left, null, 750);
        }
    }

    private getPanel(panelKey: string) {
        return this.panels.find(p => p.key === panelKey);
    }

    private scrollView(left: number | null, top: number | null, ms?: number) {

        let viewLeft = left === null ? null : left * this.viewRatio;
        let viewTop = top === null ? null : top * this.viewRatio;

        if (!!viewLeft && viewLeft > (this.scrollWidth - this.scrollClientWidth)) {
            viewLeft = this.scrollWidth - this.scrollClientWidth;
        }

        if (!!viewTop && viewTop > (this.scrollHeight - this.scrollClientHeight)) {
            viewTop = this.scrollHeight - this.scrollClientHeight;
        }

        if (ms) {

            const params: anime.AnimeParams = {
                targets: this,
                easing: "easeOutCirc",
                // complete: (anim: anime.AnimeInstance) => {
                //     this.scrollView(left, top);
                // }
            };

            if (left !== null) {
                params.scrollLeft = viewLeft;
                params.duration = ms;
            }

            if (top !== null) {
                params.scrollTop = viewTop;
                params.duration = ms;
            }

            if (params.duration) {
                anime(params);
            }

        } else {

            if (viewLeft !== null) {
                this.scrollLeft = viewLeft;
            }

            if (viewTop !== null) {
                this.scrollTop = viewTop;
            }
        }
    }
}




