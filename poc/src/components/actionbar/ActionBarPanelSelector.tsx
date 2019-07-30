import React from 'react';
import  ISurfaceController  from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';
import ActionBarButton from './ActionBarButton';
import ActionBarGroup from './ActionBarGroup';

interface IProperties {
    title?: string;
    aligned?: "left" | "right" | "center",
    stretch?: boolean,
    border?: boolean
}

export default class ActionBarPanelSelector extends SurfaceComponent<IProperties> {

    public renderInContext(controller: ISurfaceController, classes: Classes) {

        return (
            <ActionBarGroup aligned="left" stretch={true}>
                {controller.panels.reduce((results: any, item: any, index: any, panels: any) => {

                    results.push(<ActionBarButton key={item.title + "-btn"} state={item} onClick={onClick}>{item.title}</ActionBarButton>);
                    if (index < panels.length - 1) {
                        results.push(<div key={item.title + "-spacer"} className="spacer">&#x2022;</div>);
                    }

                    return results;
                }, [] as JSX.Element[])}
            </ActionBarGroup>
        );

        function onClick(state: any) {
            controller.showPanel(state.key);
        }
    }
}