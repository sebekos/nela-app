const { User } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = {
    login: async (_, args) => {
        const { email, password } = args;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new AuthenticationError("Invalid credentials");
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new AuthenticationError("Invalid credentials");
            }
            const token = jwt.sign({ userId: user.uuid, email: user.email }, process.env.jwtSecret, {
                expiresIn: "1h" //1h
            });
            const decoded = jwt.decode(token);
            return { id: "auth", isAuth: true, userId: decoded.userId, token: token, tokenExpiration: decoded.exp };
        } catch (error) {
            console.log(error);
            throw new Error("Server Error");
        }
    }
};
