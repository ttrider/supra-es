import { Observer } from 'mobx-react';
import React from 'react';
import ISurfaceController from 'src/models/ISurfaceController';
import { Classes, SurfaceContext } from './SurfaceContext';

export default class SurfaceComponent<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    public render() {
        return <SurfaceContext.Consumer>
            {({ classes, controller }) => {
                return (<Observer>{() => this.renderInContext(controller, classes)}</Observer>);
            }}
        </SurfaceContext.Consumer>;
    }
    public renderInContext(controller: ISurfaceController, classes: Classes) {
        return (<></>);
    }
}

