const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectedUser = async(req, res, next) => {
    let authToken;

    if (req.headers.authorization) {
        try {
            const { authorization } = req.headers;
            authToken = authorization.split(" ")[1];
            console.log(authToken);

            const decodedRes = jwt.verify(authToken, process.env.JWT_SECRET);
            console.log(decodedRes);
            req.user = await User.findById(decodedRes.id);

            next();
        } catch (error) {
            res.status(400);
            throw new Error('Not authorized');
        }
    }

    if (!authToken) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
}

module.exports = { protectedUser };