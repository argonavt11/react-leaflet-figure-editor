import * as React from "react";
import FigureEditor from "./react-leaflet-figure-editor";
import { Map, TileLayer } from "react-leaflet";
import Control from "@skyeer/react-leaflet-custom-control";

import "./index.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Map center={[47.445745, 40.272891666666666]} zoom={10}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topright">
            <FigureEditor />
          </Control>
        </Map>
      </div>
    );
  }
}

export default App;
