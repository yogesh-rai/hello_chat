const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        picture: {
            type: String,
            default: "https://img.freepik.com/free-icon/user_318-159711.jpg",
        }
    },
    {
        timeStamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;