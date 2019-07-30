import { observer } from 'mobx-react';
import React from 'react';
import { ISurfaceControllerProvider } from '../SurfaceContext';


interface IProperties {
    title?: string;
    aligned?: "left" | "right" | "center",
    stretch?: boolean,
    border?: boolean
}

@observer export default class ActionBarZoom extends React.Component<ISurfaceControllerProvider & IProperties> {


    public render() {

        const aligned = this.props.aligned ? this.props.aligned : "left";

        const className = ["group", "group-" + aligned];
        if (this.props.border) {
            className.push("group-" + aligned + "-border");
        }

        if (this.props.stretch) {
            className.push("group-stretch");
        }

        const title = this.props.title ? <div className="title">{this.props.title}:</div> : undefined;

        return (
            <section className={className.join(" ")}>
                {title}
                {this.props.children}
            </section>
        );
    }
}
