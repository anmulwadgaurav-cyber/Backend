import app from "./src/app.js";
import { createServer } from "http"; //iss module ko use karne ka purpose itna hi hai ki socketio express ke sath direct kaam karta nahi hai
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});

/*
CAUTION: Using app.listen(3000) will not work here, as it creates a new HTTP server.
*/
