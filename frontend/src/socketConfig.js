// import socketIOClient from "socket.io-client";
// let endpoint = "http://localhost:5000";
// let socket = socketIOClient(`${endpoint}`);

import io from "socket.io-client"
const socket= io()

export default socket;
