const { User } = require("../../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = {
    login: async ({ email, password }) => {
        console.log("here");
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        console.log("here1");
        const isEqual = await bcrypt.compare(password, user.dataValues.password);
        if (!isEqual) {
            throw new Error("Invalid credentials");
        }
        console.log("here2");
        const token = jwt.sign({ userId: user.dataValues.uuid, email: user.dataValues.email }, process.env.jwtSecret, {
            expiresIn: "1h"
        });
        return { userId: user.dataValues.uuid, token: token, tokenExpiration: 1 };
    }
};
