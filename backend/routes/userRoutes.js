const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { protectedUser } = require('../middlewares/protectedUser');
const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/getusers').get(protectedUser, getAllUsers);


module.exports = userRoutes;