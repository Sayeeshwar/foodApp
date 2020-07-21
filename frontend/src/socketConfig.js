import socketIOClient from "socket.io-client";
let endpoint = "http://localhost:5000";
let socket = socketIOClient(`${endpoint}`);

export default socket;
