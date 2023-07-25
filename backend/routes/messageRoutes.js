const express = require('express');
const { protectedUser } = require('../middlewares/protectedUser');
const { sendMessage, getAllMessages } = require('../controllers/messageController');
const messageRoutes = express.Router();

messageRoutes.route('/').post(protectedUser, sendMessage);
messageRoutes.route('/:chatId').get(protectedUser, getAllMessages);

module.exports = messageRoutes;