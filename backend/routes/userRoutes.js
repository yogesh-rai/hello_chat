const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const userRoutes = express.Router();


userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(loginUser);

module.exports = userRoutes;