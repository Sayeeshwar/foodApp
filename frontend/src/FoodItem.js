import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
// import Button from 'react-bootstrap/Button'
function FoodItem(props) {
  return (
    <div>
      <hr />

      <Card>
        <Card.Header as="h4">{props.props.dishName}</Card.Header>
        <Card.Body as="div">
          <Card.Title>
            <h5>Posted on: {props.props.donationTime}</h5>{" "}
            {console.log("time object: ",typeof(props.props.donationTime))}
          </Card.Title>
          <Card.Text as="div">
            <Container>
            <h6>Serves: {props.props.quantity}</h6>
            <h6>{props.props.isVeg ? "Vegetarian" : "Non vegetarian"}</h6>
            <h6>Latitude: {props.props.latLocation}</h6>
            <h6>Longtitude: {props.props.longLocation}</h6>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <h3></h3> */}
    </div>
  );
}

export default FoodItem;
