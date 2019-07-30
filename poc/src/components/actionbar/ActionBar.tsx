import React from 'react';
import ISurfaceController from 'src/models/ISurfaceController';
import SurfaceComponent from '../SurfaceComponent';
import { Classes } from '../SurfaceContext';
import ActionBarGroup from './ActionBarGroup';
import ActionBarPanelSelector from './ActionBarPanelSelector';
import ActionBarViewModelSelector from './ActionBarViewModelSelector';



export default class ActionBar extends SurfaceComponent {

    public renderInContext(controller: ISurfaceController, classes: Classes) {

        return (
            <section className={classes.actionbar}>

                <ActionBarPanelSelector />

                <ActionBarGroup aligned="center" />

                <ActionBarViewModelSelector aligned="right" border={true} />

                <ActionBarGroup aligned="right" border={true} title="view mode" >
                    <div className="button" >PLAN</div>

                    <div className="spacer">&#x2022;</div>
                    <div className="button" >STORAGE</div>
                </ActionBarGroup>
                <ActionBarGroup aligned="right" border={true} />


                {/* <!-- ko if: isAddToWorkspace -->
        <section class="actionbar-group" style="justify-content: flex-center; padding-left:1em; padding-right:1em;">
            <div class="button" data-bind="clickAddToWorkspace: ''">ADD TO WORKSPACE</div>
        </section>
        <!-- /ko -->
        <section class="actionbar-group" style="flex-grow:1; justify-content: flex-end;">
            <div style="font-size:0.7em;">VIEW NODES:</div>
            <!-- ko foreach: viewModelSelector.items -->
            <div data-bind="if: $index() > 0">◝</div>
            <div class="button" data-bind="text: title, css: { 'selected': selected }, click:$parent.viewModelSelector.select, attr:{'title':title}"></div>
            <!-- /ko -->
        </section>
        <section class="actionbar-group bl">
            <div style="font-size:0.7em;">ZOOM:</div>
            <div class="button" data-bind="clickToZoom: 'zoomOut', template: 'zoomout-button'"></div>
            <div class="button" data-bind="clickToZoom: 'reset'" style="min-width: 2.5em;
            text-align: center;"></div>
            <div class="button" data-bind="clickToZoom: 'zoomIn', template: 'zoomin-button'"></div>
            <div class="button" style="margin-left:0.3em;" data-bind="clickToZoom: 'fit'">fit</div>
        </section>

        <section class="actionbar-group bl">
            <div class="button" data-bind="text: infobarVisible()?'hide &gt;':'&lt; search', clickBubble: false, click:function(){infobarVisible(!infobarVisible());}"></div>
        </section> */}
            </section>)
    }
}
