import React from "react";
import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button'
function FoodItem(props) {
  return (
    <div>
      <hr />

      <Card>
        <Card.Header as="h4">{props.props.dish_name}</Card.Header>
        <Card.Body>
          <Card.Title>
            <h5>Posted on: {props.props.date_created}</h5>{" "}
          </Card.Title>
          <Card.Text>
            <h6>Serves: {props.props.quantity}</h6>
            <h6>Veg/Non-veg: {props.props.isVeg ? "Veg" : "Non-veg"}</h6>
            <h6>Latitude{props.props.lat}</h6>
            <h6>Longtitude{props.props.long}</h6>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <h3></h3> */}
    </div>
  );
}

export default FoodItem;
