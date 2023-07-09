const express = require('express');
const { protectedUser } = require('../middlewares/protectedUser');
const { accessChat } = require('../controllers/chatController');
const chatRoutes = express.Router();


chatRoutes.route('/').post(protectedUser, accessChat);
// chatRoutes.route('/login').post(loginUser);

module.exports = chatRoutes;