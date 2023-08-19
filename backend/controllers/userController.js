const generateToken = require('../config/generateToken');
const User = require('../models/userModel');

const registerUser = async(req, res) => {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all the feilds');
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({ name, email, password, picture });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                picture: user.picture,
                token: generateToken(user._id),
            })
        } else {
            res.status(400);
            throw new Error('Failed to create new user');
        }

    } catch (error) {
        res.status(400).json({
            error: error?.message,
        })
    }

}

const loginUser = async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all the feilds');
    }

    try {
        const user = await User.findOne({ email });

        if(user && (await user.verifyPassword(password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                picture: user.picture,
                token: generateToken(user._id),
            })
        } else {
            res.status(400);
            throw new Error('Invalid Email or password');
        }
        
    } catch (error) {
        res.status(400).json({
            error: error?.message,
        })
    }
}

const getAllUsers = async(req, res) => {
    const { query } = req;
    let searchTerm = {};
    if (query.search) {
        searchTerm = { name: { $regex: query.search, $options: "i" } };
    }

    try {
        const allUsers = await User.find(searchTerm).find({ _id: { $ne: req.user._id } });
        if (allUsers.length > 0) {
            res.send(allUsers);
        } else {
            throw new Error('No user found!')
        }
        

    } catch (error) {
        res.status(400).json({
            error: error?.message,
        })
    }
}

module.exports = { registerUser, loginUser, getAllUsers };