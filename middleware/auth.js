const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = (req) => {
    //Get token
    const token = req.header("x-auth-token");

    //Check if not token
    if (!token) {
        req.user = null;
        return { user: null };
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        return { user: decoded.user };
    } catch (err) {
        return { user: null };
    }
};
