import * as React from 'react';
import './App.css';

import { parse, Plan, PlanStatement } from "supra-sqlplan";
import Surface from './components/Surface';
import SurfaceController from './controllers/SurfaceController';
import complexPlan from "./examples/sql";
import { createDefaultView, createSections } from './sql/graphFactory';

class App extends React.Component {

  public surfaceContext: SurfaceController<Plan, PlanStatement>;

  constructor() {
    super({});

    const plan = parse("foo", complexPlan);

    this.surfaceContext = new SurfaceController<Plan, PlanStatement>()

      .registerSectionFactory((d) => createSections(d))

      .registerViewFactory({
        id: "all",
        title: "All",
        createView: (d, selected) => createDefaultView(d, selected)
      })
      .registerViewFactory({
        id: "all2",
        title: "All2",
        createView: (d, selected) => createDefaultView(d, selected)
      })
      ;


    this.surfaceContext.data = plan;

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
