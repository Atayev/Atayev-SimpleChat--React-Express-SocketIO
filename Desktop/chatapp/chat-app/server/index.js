const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET"],
  },
});

// add the following middleware function to set the CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

io.on("connection", (socket) => {
  console.log("user Connected: ", socket.id);
  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("user with id: " + socket.id + "joined to room" + data);
    socket.on("sendMessage", (data) => {
      console.log(data);
      socket.to(data.room).emit("receiveMessage", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("disconneced", socket.id);
  });
});

server.listen(4000, () => {
  console.log("server started");
});
