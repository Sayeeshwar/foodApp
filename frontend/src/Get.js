import React, { Component } from "react";
import FoodItem from "./FoodItem";
import GetMap from "./MapGet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class Get extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      donations: [],
      ready: 0,
    };
    this.showPosition = this.showPosition.bind(this);
    this.props.socket.on("newDonation", (msg) => {
      console.log(msg);
      this.setState({
        ready: 0,
      });
      this.getFood();
    });
  }

  componentDidMount() {
    this.getLocation();
    this.getFood();
  }

  async getFood() {
    let response = await fetch("/getFood");
    let data = await response.json();
    console.log(" heyyy donations ",data['donation'])
    this.setState({
      donations: data["donation"],
      ready: 1,
    });
  }

  showPosition(position) {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  render() {
    const giveStyle = {
      border: 4,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 5,
    };

    return (
      <div>
        <br />
        <h3>Need food? Here are some delicious meals in your area!</h3>
        <br />
        <br />
        <Container style={giveStyle}>
          <Row>
            <Col md={8} style={{ padding: 0 }}>
              {this.state.ready ? (
                <GetMap
                  userLat={this.state.lat}
                  userLong={this.state.long}
                  locations={this.state.donations}
                />
              ) : null}
            </Col>
            <Col md={4}>
              <div style={{ maxHeight: "70vh", overflow: "auto" }}>
                {this.state.donations.map((donation) => (
                  <FoodItem key={donation._id} props={donation} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Get;
