const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { protectedUser } = require('../middlewares/protectedUser');
const userRoutes = express.Router();


userRoutes.route('/').get(protectedUser, getAllUsers).post(registerUser);
userRoutes.route('/login').post(loginUser);

module.exports = userRoutes;