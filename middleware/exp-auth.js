const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = function (req, res, next) {
    // Get token
    const token = req.header("x-auth-token");
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        console.log(decoded);
        req.user = decoded.user;
        res.locals.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
