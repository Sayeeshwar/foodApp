import React, { useState } from "react";
import Give from "./Give";
import Get from "./Get";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
const System = (props) => {
  const [tab, setTab] = useState("get");
  return (
    <div>
      <Tabs
        justify
        onSelect={(key) => setTab(key)}
        defaultActiveKey="get"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="give" title="Give">
          <Give key={tab} socket={props.socket} />
        </Tab>
        <Tab eventKey="get" title="Get">
          <Get key={tab} socket={props.socket} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default System;
