const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = async (req, res) => {

    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data!");
        return res.status(400).send("Invalid data!");
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name picture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name picture',
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });

        res.status(200).send(message);
        
    } catch (error) {
        res.status(400);
        throw new Error(error?.message);
    }
}

const getAllMessages = async (req, res) => {
    try {
        const allMessages = await Message.find({ chat: req.params.chatId }).populate("sender", "name picture").populate("chat");
        res.status(200).send(allMessages);
    } catch (error) {
        res.status(400);
        throw new Error(error?.message);
    }
}

module.exports = { sendMessage, getAllMessages };