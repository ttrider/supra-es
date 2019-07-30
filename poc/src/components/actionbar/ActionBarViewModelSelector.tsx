import React from 'react';
import ISelectable  from 'src/models/ISelectable';
import ISurfaceController  from 'src/models/ISurfaceController';
import ISurfaceViewInfo  from 'src/models/ISurfaceViewInfo';
import SurfaceComponent from '../SurfaceComponent';
import ActionBarGroup from './ActionBarGroup';

interface IProperties {
    title?: string;
    aligned?: "left" | "right" | "center",
    stretch?: boolean,
    border?: boolean
}

export default class ActionBarViewModelSelector extends SurfaceComponent<IProperties> {

    public renderInContext(controller: ISurfaceController) {

        return (
            <ActionBarGroup {...this.props} title="view mode">
                {
                    controller.views.reduce((results: JSX.Element[], item: ISurfaceViewInfo & ISelectable, index: number, panels: any[]) => {

                        const className = "button" + ((item.selected) ? " selected" : "");

                        results.push(<div key={item.id + "-btn"} className={className} onClick={item.select}>{item.title}</div>);

                        if (index < panels.length - 1) {
                            results.push(<div key={item.id + "-spacer"} className="spacer">&#x2022;</div>);
                        }

                        return results;
                    }, [] as JSX.Element[])
                }
            </ActionBarGroup>
        )
    }
}
