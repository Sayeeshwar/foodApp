import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import Give from "./Give";
import Get from "./Get";
import socket from "./socketConfig";
import { gridLayer } from "leaflet";

function Welcome(props) {
  const [tab, setTab] = useState("get");

  return (
    <div>
      <Row>
        <Col md={10}>
          <h1 style={{ textAlign: "left", marginLeft: 100 }}>Foodapp</h1>
        </Col>
        <Col md={2}>
          <Dropdown>
            <Dropdown.Toggle
              style={{
                marginLeft: 5,
                marginTop: 5,
              }}
              variant="info"
              id="dropdown-basic"
            >
              {props.user.firstName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <p style={{ color: "gray", fontSize: 12 }}>
                  {props.user.email}
                </p>
              </Dropdown.Item>
              <Dropdown.Item href="http://localhost:5000/logout">
                <p>Logout</p>
              </Dropdown.Item>
              <Dropdown.Item href="/me">
                <p>Manage profile</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <hr style={{ margin: 0 }} />
      <Tabs
        justify
        onSelect={(key) => setTab(key)}
        defaultActiveKey="get"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="give" title="Give">
          <Give key={tab} socket={socket} />
        </Tab>
        <Tab eventKey="get" title="Get">
          <Get key={tab} socket={socket} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Welcome;
