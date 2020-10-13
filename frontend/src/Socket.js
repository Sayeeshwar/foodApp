import React, { useEffect, useState } from "react";
//import io from "socket.io-client";

//let endpoint = "http://localhost:5000";

//let socket = io.connect(`${endpoint}`);

const Socket = (props) => {
  const [messages, setMessages] = useState(["Hello and welcome"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessages = () => {
      props.socket.on("message", (msg) => {
        setMessages([...messages, msg]);
      });
    };
    getMessages();
  }, [messages.length]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if (message !== "") {
      props.socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add message");
    }
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div key={msg.length}>
            <p>{msg}</p>
          </div>
        ))}

      <input
        value={message}
        name="message"
        onChange={(e) => {
          onChange(e);
        }}
      />

      <button onClick={() => onClick()}>Send message</button>
    </div>
  );
};

export default Socket;
