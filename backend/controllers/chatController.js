const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = async(req, res) => {
    const { receiverId } = req.body;

    if (!receiverId) {
        res.status(400);
        throw new Error('User not found!');
    }

    try {
        let isChat = await Chat.find({
            $and: [
                { users: {$elemMatch: { $eq: req.user._id }} },
                { users: {$elemMatch: { $eq: receiverId }} },
            ],
        }).populate("users").populate("latestMessage");

        isChat = User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email',
        })

        // console.log(isChat);

        if (isChat.length > 0) {
            console.log(isChat);
            res.send(isChat[0]);
        } else {
            const chatData = {
                chatName: "sender",
                users: [req.user._id, receiverId],
            };

            const createdChat = await Chat.create(chatData);

            if (createdChat) {
                const fullChats = await Chat.findOne({ _id: createdChat._id }).populate("users");

                res.status(200).send(fullChats);
            } else {
                res.status(400);
                throw new Error('Failed to access chat!');
            }
        }

    } catch (error) {
        res.status(400).json({
            error: error?.message,
        })
    }
}

module.exports = { accessChat };