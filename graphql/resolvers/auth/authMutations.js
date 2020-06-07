const { User } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
require("dotenv").config();
const { uuid } = require("uuidv4");

module.exports = {
    register: async (_, args) => {
        const { email, password, key } = args;
        if (process.env.REGISTER_KEY !== key) {
            throw new AuthenticationError("Invalid key");
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
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
