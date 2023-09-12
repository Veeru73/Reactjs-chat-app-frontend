import io from "socket.io-client";
const baseUrl = process.env.REACT_APP_baseUrl;
const socket = io(baseUrl);

module.exports = socket;
