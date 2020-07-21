import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    let response = await fetch("http://localhost:5000/isLoggedin", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    setisAuth(Number(data.isLoggedin));
    console.log("isLoggedin", isAuth);

    if (data.user) {
      data.user.firstName =
        data.user.username.charAt(0).toUpperCase() +
        data.user.username.slice(1);
    }

    setUser(data.user);
    console.log(("user", data));
  }

  useEffect(() => {
    isAutho();
  }, [isAuth]);

  return (
    <div className="App">
      <Router>
        {isAuth ? (
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Welcome {...props} user={user} socket={socket} />
              )}
            />

            <Route
              path="/welcome"
              render={(props) => (
                <Welcome {...props} user={user} socket={socket} />
              )}
            />
          </Switch>
        ) : (
          <Route path="/" component={Home} />
        )}
      </Router>
    </div>
  );
}

export default App;
