import { computed } from 'mobx';
import { observer } from "mobx-react";
import React from 'react';



@observer export default class SelectorCheckbox extends React.Component<{ state: boolean, onClick: (e: React.MouseEvent) => void }> {

    @computed private get innerClass() {

        return "inner" + (this.props.state ? " inner-selected" : "");
    }

    public render() {

        return (
            <g className="checkbox" onClick={this.props.onClick}>
                <rect className="outer" />
                <rect className={this.innerClass} />
            </g>
        );
    }
}


