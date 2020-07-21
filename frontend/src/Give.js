import React, { Component } from "react";
import Map from "./Map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Give extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      locationSet: 0,
    };
    this.showPosition = this.showPosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getLocation();
  }

  showPosition(position) {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
      locationSet: 1,
    });

    document.getElementById("lat").value = this.state.lat;
    document.getElementById("long").value = this.state.long;
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

        <h3>Let's bring people together with food.</h3>
        <br />
        <br />

        <Container style={giveStyle}>
          <Row>
            <Col md={7} style={{ padding: 10, paddingTop: 20 }}>
              <h5>Got extra food? Why not feed a hungry stomach?</h5>
              <br />

              <Form
                style={{ width: "70%", marginLeft: "15%" }}
                action="/add"
                method="POST"
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="dishName"
                    placeholder="Dish name"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="date"
                    name="expiry"
                    placeholder="Expires at?"
                  />
                </Form.Group>
                <Form.Check.Label>Is it vegetarian?</Form.Check.Label>
                <br />
                <br />
                <Form.Check
                  custom
                  inline
                  name="isVeg"
                  label="Veg"
                  type="radio"
                  id="Veg"
                  value="1"
                />
                <Form.Check
                  custom
                  inline
                  name="isVeg"
                  label="Non-veg"
                  type="radio"
                  id="nonveg"
                  value="0"
                />

                <br />
                <br />
                <Button type="button" onClick={this.getLocation}>
                  Get my Location
                </Button>
                <br />
                <br />
                <Form.Group>
                  <Form.Control
                    id="lat"
                    name="lat"
                    placeholder="Location latitude"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    id="long"
                    name="longt"
                    placeholder="Location longtitude"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    this.props.socket.emit(
                      "newDonation",
                      "New donation made!Update the maps!"
                    );
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col
              md={5}
              style={{
                borderLeftColor: "black",
                borderLeft: 2,
                borderLeftStyle: "solid",
                padding: 2,
              }}
            >
              <div>
                {this.state.locationSet ? (
                  <Map lat={this.state.lat} long={this.state.long} />
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Give;
