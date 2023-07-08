const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        timestamps: true,
    }
);

userSchema.methods.verifyPassword = async function(enteredPassword) {
    const verification = await bcrypt.compare(enteredPassword, this.password);
    return verification;
}

userSchema.pre('save', async function(next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;