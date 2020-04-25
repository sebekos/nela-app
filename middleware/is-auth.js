const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = (req) => {
    //Get token
    const token = req.header("x-auth-token");

    let data = {
        isAuth: false,
        userId: null
    };

    //Check if not token
    if (!token) {
        return data;
    }

    // verify token
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.jwtSecret);
    } catch (err) {
        return data;
    }
    if (!decoded) {
        return data;
    }
    data.isAuth = true;
    data.userId = decoded.userId;
    return data;
};
