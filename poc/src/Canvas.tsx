import * as React from 'react';

import { toArray } from './helpers';
import { ScrollState } from './helpers/scrollState';
import { ICanvasLayout } from './layout/layout';
import Node from './Node';
import './styles/canvas.css';


class Canvas extends React.Component<ICanvasLayout, { transform: number }> {

  private scroller: ScrollState;

  constructor(props: Readonly<ICanvasLayout>) {
    super(props);

    this.scroller = new ScrollState();

    this.state = { transform: 0 };
  }


  public render() {

    // (this.props as any).classNames = (this.props as any).classes;
    const classes = (this.props as any).classes;


    const viewBox = `0 0 ${this.props.width} ${this.props.height}`;
    const style: React.CSSProperties = {
      width: this.props.width / 4 + "px",
      height: this.props.height / 4 + "px"
    };

    const canvasStyle: React.CSSProperties = {

      position: "fixed",
      left: 10,
      top: 10,
      right: 10,
      bottom: 10,
      overflow: "auto",
      width: "auto",
      border: "1px solid gray"

    };

    const testStyle: React.CSSProperties = {

      position: "fixed",
      left: 10,
      top: 10,

    };

    const nodeLayouts = toArray(this.props.nodeLayouts);

    return (
      <div className="canvas" style={canvasStyle} onScroll={this.onScroll}>

        <div style={testStyle}>{this.state.transform}</div>

        <svg viewBox={viewBox} style={style} xmlns="http://www.w3.org/2000/svg" >

          <defs>
            <marker id="triangle" viewBox="0 0 10 10"
              refX="1" refY="5"
              markerUnits="strokeWidth"
              markerWidth="5" markerHeight="5"
              orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00" />
            </marker>
            <marker id="target-arrow" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M9,5 l-8,-4 l3,4 l-3,4 l8,-4 z" className="join-connector-marker" />
            </marker>

            <marker id="source-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="5" orient="auto">
              <circle cx="8" cy="5" r="2" stroke="black" fill="none" stroke-width="2" />
            </marker>
          </defs>

          <rect x="0" y="0" width={this.props.width} height={this.props.height} stroke="black" strokeWidth="3" fill="none" />

         

          {nodeLayouts.map(item => {
            item.classes = classes;
            return (<Node {...item} key={item.id} />);
          })}

        </svg>

      </div>

    );
  }




  private onScroll: (event: React.UIEvent<HTMLDivElement>) => void = (event) => {
    this.scroller.onScroll(event);
  }
}

export default Canvas;
