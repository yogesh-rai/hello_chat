const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const socketio = require('socket.io');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);

// to accept json data
app.use(express.json());



app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


// -------------------- Deployment -----------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -------------------- Deployment -----------------------------

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`server started on port ${PORT}`));

const io = socketio(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    // console.log("a user connected to socket.io");

    socket.on("setup", (loggedInUser) => {
        socket.join(loggedInUser?._id);
        socket.emit("connected");
    });

    socket.on("join chat", (roomId) => {
        socket.join(roomId);
        console.log(`user joined room ${roomId}`);
    });

    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved?.chat;

        if(!chat.users) return;

        chat.users.forEach((user) => {
            if (user?._id === newMessageRecieved?.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(loggedInUser._id);
    });

});
