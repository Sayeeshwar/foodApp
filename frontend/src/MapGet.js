import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

class GetMap extends Component {
  componentDidMount() {
    this.map = L.map("getmap").setView(
      [this.props.userLat, this.props.userLong],
      10
    );

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoic2F5ZWVzaHdhciIsImEiOiJja2FzYXA5NWowNWNmMnhwdHdzcTcyeGI3In0.H4Zo6XgboMYAM1-5md0ylw",
      }
    ).addTo(this.map);

    this.props.locations.map((dish) => {
      L.circle([dish.lat, dish.long], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 1450,
      }).addTo(this.map);
    });
  }

  render() {
    return <Wrapper width="100%" height="70vh" id="getmap" />;
  }
}

export default GetMap;
