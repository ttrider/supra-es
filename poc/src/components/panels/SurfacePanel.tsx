import React from 'react';
import GraphPanelLayout from 'src/controllers/panels/GraphPanelLayout';
import StoragePanelLayout from 'src/controllers/panels/StoragePanelLayout';
import SurfacePanelLayout from 'src/controllers/panels/SurfacePanelLayout';
import TextPanelLayout from 'src/controllers/panels/TextPanelLayout';
import SurfaceGraphPanel from './SurfaceGraphPanel';
import SurfaceStoragePanel from './SurfaceStoragePanel';
import SurfaceTextPanel from './SurfaceTextPanel';

export default function SurfacePanel(props: { panel: SurfacePanelLayout }) {

    switch (props.panel.name) {
        case "GraphPanelLayout":
            return (<SurfaceGraphPanel panel={(props.panel as GraphPanelLayout)} />)
        case "StoragePanelLayout":
            return (<SurfaceStoragePanel panel={(props.panel as StoragePanelLayout)} />)
        case "TextPanelLayout":
            return (<SurfaceTextPanel panel={(props.panel as TextPanelLayout)} />)
    }
    return (<></>);
}