const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectedUser = async(req, res, next) => {
    if (req.headers.authorization) {
        try {
            const { authorization } = req.headers;
            const authToken = authorization.split(" ")[1];

            const decodedRes = jwt.verify(authToken, process.env.JWT_SECRET);
            // console.log(decodedRes);
            req.user = await User.findById(decodedRes.id);

            next();
        } catch (error) {
            res.status(400);
            throw new Error('Not authorized');
        }
    }
}

module.exports = { protectedUser };