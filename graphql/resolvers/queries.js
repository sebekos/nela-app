const { News, User } = require("../../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = {
    Query: {
        login: async (_, args) => {
            const { email, password } = args;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const isEqual = await bcrypt.compare(password, user.dataValues.password);
            if (!isEqual) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ userId: user.dataValues.uuid, email: user.dataValues.email }, process.env.jwtSecret, {
                expiresIn: "1h"
            });
            return { _id: 12345, isAuth: true, userId: user.dataValues.uuid, token: token, tokenExpiration: 1 };
        },
        news: async () => {
            try {
                const returnData = News.findAll();
                return returnData;
            } catch (error) {
                throw new Error("News data error");
            }
        }
    }
};
