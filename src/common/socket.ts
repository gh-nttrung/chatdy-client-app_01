import io, { SocketOptions } from "socket.io-client";

const URI = "http://localhost:5555";
const socketOptions = {
  // auth: {
  //   token: ""
  // }
} as SocketOptions;
const socket = io(URI, socketOptions);

socket.on("connect_error", (error) => {
  console.log("Connection error:", error);
});

export default socket;
