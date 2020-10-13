import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

//import socket from "./socketConfig";

import System from "./System";

function Welcome(props) {
  const [item, setItem] = useState("me");
  return (
    <div>
      <Row>
        <Col md={10}>
          <h1 style={{ textAlign: "left", marginLeft: 100 }}>Foodapp</h1>
        </Col>
        <Col md={2} style={{padding:0}}>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                marginLeft: 5,
                marginTop: 5,
              }}
              variant="info"
              id="dropdown-basic"
            >
              <img
                alt=""
                style={{ height: 30, borderRadius: 15 }}
                src={props.user.profile_pic}
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item disabled>
                {props.user.firstName}
                <p style={{ color: "gray", fontSize: 12 }}>
                  {props.user.email}
                </p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setItem("me");
                }}
              >
                <p>Manage profile</p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setItem("donations");
                }}
              >
                <p>Give and Get</p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setItem("chat");
                }}
              >
                <p>Chat</p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="http://localhost:5000/logout">
                <p>Logout</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <hr style={{ margin: 0 }} />
      <System user={props.user} item={item} socket={props.socket} />
    </div>
  );
}

export default Welcome;
