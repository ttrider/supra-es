import { observer } from "mobx-react";
import * as React from 'react';
import { ScrollState } from './helpers/scrollState';


@observer class RootNodeSet extends React.Component<ScrollState> {


    public render() {

        return <g transform={"translate(0, " + (this.props.scrollTop * 4) + ")"}>
            <rect x="0" y="0" width="50" height="50" stroke="black" strokeWidth="3" fill="green" />
        </g>

    }

}

export default RootNodeSet;