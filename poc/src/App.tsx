import * as React from 'react';
import './App.css';

import Surface from './components/Surface';
import SurfaceController from './controllers/SurfaceController';
import { createSections, createSurfaceView, createSurfaceViewCombined, createSurfaceViewCompact } from './es/canvasFactory';
import createNodeGraph, { NodeGraph } from './es/nodeGraphFactory';
import example00 from "./examples/example00";
import createCanvasLayout from './layout/canvas-layout';
import { ICanvasLayout } from './layout/layout';
import { createCanvas } from './model/canvas-model';
import { ICanvas } from './model/model';

class App extends React.Component {

  public surfaceContext: SurfaceController<NodeGraph>;
  public canvas: ICanvas;
  public canvasLayout: ICanvasLayout;

  constructor() {
    super({});

    if (example00.profile === undefined) {
      throw new Error("profile is missing");
    }

    this.canvas = createCanvas(example00.profile);

    const nodeG = createNodeGraph(example00.profile);
    // tslint:disable-next-line:no-console
    console.info(nodeG);

    this.canvasLayout = createCanvasLayout(this.canvas).getCanvasLayout();

    this.surfaceContext = new SurfaceController<NodeGraph>()

      .registerSectionFactory((d) => createSections(d))

      .registerViewFactory({
        id: "all",
        title: "All",
        createView: (d) => createSurfaceView(d)
      })
      .registerViewFactory({
        id: "compact",
        title: "Compact",
        createView: (d) => createSurfaceViewCompact(d)
      })
      .registerViewFactory({
        id: "combined",
        title: "Combined",
        createView: (d) => createSurfaceViewCombined(d)
      })
      ;


    this.surfaceContext.data = nodeG;

  }



  // public render() {

  //   const StyledCanvas = injectSheet(canvasStyles)(Canvas);

  //   return (
  //     <StyledCanvas {...this.canvasLayout} />
  //   );
  // }

  public render() {


    const canvasStyle: React.CSSProperties = {

      position: "fixed",
      left: 20,
      top: 20,
      right: 20,
      bottom: 20,
      border: "1px solid green"

    };

    return (

      <div style={canvasStyle} >

        <Surface controller={this.surfaceContext} />

      </div>
    );
  }
}



export default App;
