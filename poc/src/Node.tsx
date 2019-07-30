import * as React from 'react';
import { translate } from './helpers/formatter';
import { IConnector, INodeLayout, IPropertiesLayout, ITimingsLayout, lineHeight } from './layout/layout';




class Node extends React.Component<INodeLayout> {


  constructor(props: INodeLayout) {
    super(props);
  }


  public render() {

    const classes = (this.props as any).classes;


    return (
      <g>
        <g transform={translate(this.props.x, this.props.y)}>
          <rect x="0" width={this.props.width} y="0" height={this.props.height} fill="none" className="pi-default-stroke pi-normal-stroke" rx="20" ry="20" />

          <text x={this.props.cost.x} y={this.props.cost.y} className={classes.nodeHeaderText}>❮ {this.props.cost.text}%</text>

          <rect x={this.props.timings.x} width={this.props.timings.iconWidth} y={this.props.timings.y} height={this.props.timings.iconHeight} fill="none" className="pi-default-stroke pi-normal-stroke" />

          {this.timingElements(this.props.timings)}

          <text x={this.props.width / 2} y={this.props.title.top} className="pi-text-large pi-bold pi-center">{this.props.title.title}</text>

          {
            this.props.title.subtitle.map((value, index) => {
              return (<text x={this.props.width / 2} y={this.props.title.top + (index + 1) * lineHeight} key={"desc:" + value} className="pi-text-small pi-center">{value}</text>)
            })
          }


          {this.renderProperties(this.props.properties)}


          {this.props.connectors.connectors.map(connector => {

            return <text x={connector.x} y={connector.y} key={"in.cntr." + connector.id} className={classes.nodeIncomingPanelText}>{connector.title}</text>;
          })}

        </g>

        {this.props.connectors.connectors.map(item => {

          return this.renderConnector(item);
        })}

      </g>

    );
  }

  private renderConnector(connector: IConnector) {

    const ret: JSX.Element[] = [];

    ret.push(<path d={connector.geometry} key={"cntr." + connector.id} strokeLinejoin="round" fill="none" className="pi-normal-stroke pi-default-stroke" markerEnd="url(#target-arrow)" markerStart="url(#source-arrow)" />);

    return ret;
  }

  private renderProperties(properties: IPropertiesLayout) {
    const ret: JSX.Element[] = [];

    if (properties.rows.length > 0) {

      let y = properties.top + lineHeight;

      ret.push(<text x={this.props.width / 2} y={this.props.properties.top} className="pi-text-smaller pi-bold pi-center">PROPERTIES</text>);
      ret.push(<text key="item:00:00" x={properties.columnPositions[0]} y={y} className="pi-text-smaller pi-bold">Breakdown</text>);
      ret.push(<text key="item:00:01" x={properties.columnPositions[1]} y={y} className="pi-text-smaller pi-bold pi-right">Duration</text>);
      ret.push(<text key="item:00:02" x={properties.columnPositions[2]} y={y} className="pi-text-smaller pi-bold pi-right">Count</text>);

      y += lineHeight;
      let index = 1;
      for (const property of properties.rows) {
        // ret.push(<rect key={`item:01:${index}`} x={propertiesNameLeft - 15} y={y - 40} width={propertiesCountRight} height="100" fill={index % 2 ? "rgb(240, 247, 255)" : "none"} />);
        ret.push(<text key={`item:02:${index}`} x={properties.columnPositions[0]} y={y} className="pi-text-smaller">{property.columns[0]}</text>);
        ret.push(<text key={`item:03:${index}`} x={properties.columnPositions[1]} y={y} className="pi-text-smaller pi-right">{property.columns[1]}</text>);
        ret.push(<text key={`item:04:${index}`} x={properties.columnPositions[2]} y={y} className="pi-text-smaller pi-right">{property.columns[2]}</text>);
        ret.push(<text key={`item:05:${index}`} x={properties.columnPositions[1]} y={y + lineHeight} className="pi-text-smaller pi-right">{property.spanString}</text>);
        index++;
        y += lineHeight * 2;
      }
    }
    return ret;
  }


  private timingElements(timings: ITimingsLayout) {

    return timings.values.map((item, index) => {

      const y = index * timings.lineHeight * 2 + timings.textY;

      return (<g key={"timingElement:" + item.label}>
        <text x={timings.labelX} y={y} className="pi-text-smaller">{item.label}:</text>
        <text x={timings.valueX} y={y} className="pi-text-smaller pi-right">{item.value}</text>
        <text x={timings.valueX} y={y + timings.lineHeight} className="pi-text-smaller pi-right">{item.subValue}</text>
      </g>)
    });

  }

}

export default Node;
