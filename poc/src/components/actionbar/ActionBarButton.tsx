import { observer } from 'mobx-react';
import React from 'react';

@observer export default class ActionBarButton extends React.Component<{ state: any, onClick: (state: any) => void }> {

    public render() {
        return (<div className="button" onClick={this.onClick}>{this.props.children}</div>);
    }

    public onClick = (e: React.MouseEvent) => { this.onClickHandler(e); };

    private onClickHandler(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onClick(this.props.state);
    }
}
