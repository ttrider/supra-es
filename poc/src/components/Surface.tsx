import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import injectSheet from 'react-jss';
import IScrollController from 'src/models/IScrollController';
import ISurfaceController from 'src/models/ISurfaceController';
import styles from "../controllers/styles";
import ActionBar from './actionbar/ActionBar';
import SurfacePanel from './panels/SurfacePanel';
import ScrollComponent from './ScrollContainer';
import Section from './section/SectionPanel';
import SectionSelector from './section/SectionSelector';
import { SurfaceContext, SurfaceContextProvider } from './SurfaceContext';
import SurfaceDefs from './SurfaceDefs';
import SurfacePanelTitle from './SurfacePanelTitle';




@observer class Surface extends React.Component<{ controller: ISurfaceController & IScrollController }> {

    public get classes(): { [name in keyof typeof styles]: string } {
        return (this.props as any).classes;
    }

    private contextProvider: SurfaceContextProvider;

    constructor(props: { controller: ISurfaceController & IScrollController }) {
        super(props);

        this.contextProvider = new SurfaceContextProvider();
        this.contextProvider.classes = this.classes;
        this.contextProvider.controller = this.props.controller;
    }

    public render() {


        return (
            <SurfaceContext.Provider value={this.contextProvider}>
                <div className={this.classes.surface}>
                    <ActionBar />

                    <ScrollComponent controller={this.props.controller}>

                        <svg viewBox={this.svgViewBox} style={this.svgViewStyle} xmlns="http://www.w3.org/2000/svg" >
                            <SurfaceDefs />

                            <rect x="0" y="0" width={this.viewWidth} height={this.viewHeight} fill="url(#noisewhite)" />

                            {this.props.controller.panelTitles.map((item) => (<SurfacePanelTitle key={item.value} panelContext={item} />))}

                            {this.props.controller.panels.map((item) => (<SurfacePanel key={item.title} panel={item} />))}

                            <Section />

                            <SectionSelector />
                        </svg>

                    </ScrollComponent>

                </div>
            </SurfaceContext.Provider>
        );
    }

    @computed private get viewWidth() {
        return this.props.controller.viewWidth;
    }
    @computed private get viewHeight() {
        return this.props.controller.viewHeight;
    }

    @computed private get width() {
        return this.props.controller.width;
    }
    @computed private get height() {
        return this.props.controller.height;
    }


    @computed private get svgViewBox() {
        return `0 0 ${this.viewWidth} ${this.viewHeight}`;
    }
    @computed private get svgViewStyle() {
        return {
            width: this.width + "px",
            height: this.height + "px"
        } as React.CSSProperties;
    }
}

const StyledSurface = injectSheet(styles)(Surface);

export default StyledSurface;

