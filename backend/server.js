const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();

connectDB();
const app = express();

// to accept json data
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('API is running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = require('socket.io')(server, {
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

});