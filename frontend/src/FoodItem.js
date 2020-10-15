import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
function FoodItem(props) {
  function readableTime(time)
  {
    let year=time.substr(0,4)
    let month=time.substr(5,2)
    let date=time.substr(8,2)
    let hour=time.substr(11,2)
    let minute=time.substr(14,2)
    let formattedTime= hour+":"+minute+", "+date+"/"+month+"/"+year
    return formattedTime
  }
  
  let contact="mailto:"+props.props.donorEmail
  return (
    <div>
      <hr />

      <Card>
        <Card.Header as="h4">{props.props.dishName}</Card.Header>
        <Card.Body as="div">
          <Card.Title>
            <h6>By {props.props.donorName}</h6>
            <Button href={contact}>Contact donor</Button>
            
          </Card.Title>
          <hr></hr>
          <Card.Text as="div">
            <Container>
            <h6>Posted at: {readableTime(props.props.donationTime)}</h6>
            <h6>Expires by: {readableTime(props.props.expiry)}</h6>
            <h6>Serves: {props.props.quantity}</h6>
            <h6>{props.props.isVeg ? "Vegetarian" : "Non vegetarian"}</h6>
            {/* <h6>Latitude: {props.props.latLocation}</h6> */}
            {/* <h6>Longtitude: {props.props.longLocation}</h6> */}
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <h3></h3> */}
    </div>
  );
}

export default FoodItem;
