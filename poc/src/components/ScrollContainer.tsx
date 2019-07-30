import { action, autorun } from 'mobx';
import React from 'react';
import  ISurfaceController from 'src/models/ISurfaceController';

export default class ScrollComponent extends React.Component<{ controller: ISurfaceController }> {

    private domRef: React.RefObject<HTMLDivElement>;

    constructor(p: Readonly<{ controller: ISurfaceController }>) {
        super(p);
        this.domRef = React.createRef();

        autorun(reaction => {

            const controller = this.props.controller;
            const scrollLeft = controller.scrollLeft;
            const scrollTop = controller.scrollTop;

            const element = this.domRef.current;
            if (element) {
                element.scrollTo(scrollLeft, scrollTop);
            }
        });
    }

    public componentDidMount() {

        window.addEventListener("resize", () => this.doUpdate());
        window.addEventListener("zoom", () => this.doUpdate());
        window.addEventListener("wheel", () => this.doUpdate());


        if (this.domRef.current) {
            const element = this.domRef.current;
            this.doUpdate(element);
        }
    }

    public render() {
        return (<div ref={this.domRef} onScroll={this.onScroll} style={{ overflow: "auto", flexGrow: 1 }}>{this.props.children}</div>);
    }

    public onScroll = (event: React.UIEvent<HTMLDivElement>) => {

        this.doUpdate(event.currentTarget);
        event.stopPropagation();

    }

    @action private doUpdate(element?: HTMLDivElement) {

        if (!element) {
            if (this.domRef.current) {
                element = this.domRef.current;
            }
        }

        if (element) {
            this.props.controller.onScrollEvent(element.scrollLeft, element.scrollTop, element.scrollWidth, element.scrollHeight, element.clientWidth, element.clientHeight);
        }
    }
}
