import * as React from "react";
import * as L from "leaflet";
import AddFigureType from "./addFigureType";
import ListFigures from "./listFigures";
import InformationAboutFigure from "./information";
import Control from "@skyeer/react-leaflet-custom-control";
import { IFigure, IfigureEditorState } from "./interfaces";
import { MapLayer, withLeaflet } from "react-leaflet"; 

declare module "react-leaflet" {
  const withLeaflet: <T>(component: T) => T;
  interface ILeafletContext {
      map?: L.Map;
  }
}

const SettingIcon = () => (
  <svg
    enableBackground="new 0 0 32 32"
    id="Editable-line"
    version="1.1"
    viewBox="0 0 32 32"
  >
    <circle
      cx="16"
      cy="16"
      fill="none"
      id="XMLID_224_"
      r="4"
      stroke="#a8b6c1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  "
      fill="none"
      id="XMLID_242_"
      stroke="#a8b6c1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);

class FigureEditor extends MapLayer {
  state: IfigureEditorState = {
    showAddFigureType: false,
    figureList: [],
    focusFigure: null
  };

  toggleSettings = () =>
    this.setState({ showAddFigureType: !this.state.showAddFigureType });

  addFigure = (figure: IFigure): void =>
    this.setState({
      figureList: [...this.state.figureList, figure],
      focusFigure: figure.id
    });

  changeFucusFigure = (id: string): void => this.setState({ focusFigure: id });

  componentDidMount() {
    console.log(this);
  }

  /* tslint:disable */
  createLeafletElement(props: Object): Object {
    return props;
  }
  /* tslint:enable */

  public render() {
    const activeFigure = this.state.focusFigure ? this.state.figureList.find((item) => item.id === this.state.focusFigure) : undefined;

    return (
      <Control position="topright">
      <div className="figure-control">
        <div className="wrap-figure-control">
          <button className="settings-button" onClick={this.toggleSettings}>
            <SettingIcon />
          </button>
        </div>
        {this.state.showAddFigureType && (
          <div className="settings-figure-control">
            <AddFigureType addFigure={this.addFigure} />
            {this.state.figureList.length > 0 && (
              <ListFigures
                figures={this.state.figureList}
                focusFigure={this.state.focusFigure}
                changeFucusFigure={this.changeFucusFigure}
              />
            )}
            {activeFigure && <InformationAboutFigure {...activeFigure} />}
          </div>
        )}
      </div>
      </Control>
    );
  }
}

export default withLeaflet(FigureEditor);