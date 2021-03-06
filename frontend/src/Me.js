import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Me.css";
function Me(props) {
  //console.log(props.user.profile_pic)
  return (
    <div>
      <Card
        bg={"info"}
        text={"white"}
        style={{
          width: "38%",
          marginTop: 30,
          marginLeft: "28%",
          height: "100%",
          textAlign: "left",
        }}
        className="mb-2"
      >
        <Card.Header as="div">
          <Row>
            <Col md={10}>
              <img
                alt=""
                style={{ height: 40, borderRadius: 15 }}
                src={props.user.profile_pic}
              ></img>
            </Col>
            <Col md={2}>
              <h2>{props.user.firstName}</h2>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text as="div">
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Username
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.username} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Email
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.email} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Joined on:
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.doj} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Age
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.age} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Phone
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.phone} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Donor rating
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    readOnly
                    defaultValue={props.user.donor_rating}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Recipient rating
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    readOnly
                    defaultValue={props.user.recipient_rating}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  Email
                </Form.Label>
                <Col sm="6">
                  <Form.Control readOnly defaultValue={props.user.email} />
                </Col>
              </Form.Group>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Me;
