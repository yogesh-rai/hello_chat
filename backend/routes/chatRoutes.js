const express = require('express');
const { protectedUser } = require('../middlewares/protectedUser');
const { accessChat, fetchChat } = require('../controllers/chatController');
const chatRoutes = express.Router();


chatRoutes.route('/').post(protectedUser, accessChat).get(protectedUser, fetchChat);

module.exports = chatRoutes;