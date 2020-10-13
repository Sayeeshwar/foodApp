import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
import Welcome from "./Welcome";
import Home from "./Home";
import socket from "./socketConfig";

function App() {
  const [isAuth, setisAuth] = useState();
  const [user, setUser] = useState({});

  socket.on("connect", () => {
    console.log("Client connected!");
  });

  async function isAutho() {
    //get request to check if user is authorized
    let response = await fetch("http://localhost:5000/isLoggedin", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    setisAuth(Number(data.isLoggedin));
    //console.log("isLoggedin", isAuth);

    //formats the username
    if (data.user) {
      data.user.firstName =
        data.user.username.charAt(0).toUpperCase() +
        data.user.username.slice(1);
    }
    //set state of the user to logged in user
    setUser(data.user);
    //console.log("user!!!", data);
  }

  //runs everytime the isAuth changes - on login,logout
  useEffect(() => {
    isAutho();
  }, [isAuth]);

  return (
    <div className="App">
      {/* the conditional rendering only works if placed in a router as the dom loads before useEffect sets the state of isAuth and user, thus leading to an undefined error for dom elements */}
      <Router>
        {/* redirects all urls to base url */}
        <Redirect to="/" />

        {!isAuth ? <Home /> : <Welcome user={user} socket={socket} />}
      </Router>
    </div>
  );
}

export default App;
