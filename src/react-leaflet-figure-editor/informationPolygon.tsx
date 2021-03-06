import * as React from "react";
import { IFigurePolygon } from "./interfaces";

interface IInformationAboutPolygon {
  focusPoint: number | null;
}

export default class InformationAboutPolygon extends React.Component<
  { 
    deletePolygonPoint: (index: number | null) => void;
    deleteFigure: (id: string) => void;
    figure: IFigurePolygon 
  },
  IInformationAboutPolygon
> {
  state: IInformationAboutPolygon = {
    focusPoint: null
  };

  changeFocusPoint = (id: number) => (e: any) =>
    this.setState({ focusPoint: id });
  
  deletePoint = () => (e: any) => {
    this.props.deletePolygonPoint(this.state.focusPoint);
    this.setState({focusPoint: null});
  }

  deleteFigure = () => (e: any) => this.props.deleteFigure(this.props.figure.id);

  public render() {
    return (
      <div className="figure-info">
        {this.props.figure.coordinates.length ? (
          [
            <p key="active_points_text">Points</p>,
            <div key="active_points" className="figure-info__points">
              {this.props.figure.coordinates[0].map(
                (point: number[], index: number) => (
                  <p
                    key={index}
                    onClick={this.changeFocusPoint(index)}
                    style={
                      index === this.state.focusPoint
                        ? { background: "#17c3b4" }
                        : {}
                    }
                  >
                    {point[0]}, {point[1]}
                  </p>
                )
              )}
            </div>
          ]
        ) : (
          <p key="dont_have_active_points" style={{ marginBottom: 0 }}>
            Don't have data
          </p>
        )}
        {this.state.focusPoint !== null ? (
          <button onClick={this.deletePoint()}>Delete figure's point</button>
        ) : null}
        <button onClick={this.deleteFigure()}>Delete figure</button>
      </div>
    );
  }
}
