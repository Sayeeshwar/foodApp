import React, { useState } from "react";
import Donations from "./Donations";
import Me from "./Me";
import Socket from "./Socket";
const System = (props) => {
  return (
    <div>
      {props.item === "donations" ? (
        <Donations user={props.user} socket={props.socket} />
      ) : null}
      {props.item === "me" ? <Me user={props.user} /> : null}
      {props.item === "chat" ? <Socket /> : null}
    </div>
  );
};

export default System;
