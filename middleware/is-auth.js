const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = (req, res, next) => {
    //Get token
    const token = req.header("x-auth-token");

    //Check if not token
    if (!token) {
        req.isAuth = false;
        return next();
    }

    // verify token
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.jwtSecret);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decoded) {
        req.isAuth = false;
        return next();
    }
    console.log(decoded);
    req.isAuth = true;
    req.userId = decoded.userId;
    next();
};
