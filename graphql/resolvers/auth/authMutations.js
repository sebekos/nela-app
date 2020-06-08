const { User } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = {
    register: async (_, args) => {
        const { email, password, register_key } = args;
        if (process.env.REGISTER_KEY !== register_key) {
            throw new AuthenticationError("Invalid register key");
        }
        let userFields = {
            uuid: uuid(),
            email,
            password
        };
        try {
            let user = await User.findAll({ limit: 1, where: { email } });
            if (user.length > 0) {
                throw new Error("User already exists");
            }
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            // Hash password
            userFields.password = await bcrypt.hash(password, salt);
            user = await User.create(userFields);
            const token = jwt.sign({ userId: user.dataValues.uuid, email: user.dataValues.email }, process.env.jwtSecret, {
                expiresIn: "1h" //1h
            });
            const decoded = jwt.decode(token);
            return { id: "auth", isAuth: true, userId: decoded.userId, token: token, tokenExpiration: decoded.exp };
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
