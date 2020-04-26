const { News, User, Reunion } = require("../../sequelize");
const { AuthenticationError } = require("apollo-server");
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
                throw new AuthenticationError("Invalid credentials");
            }
            const isEqual = await bcrypt.compare(password, user.dataValues.password);
            if (!isEqual) {
                throw new AuthenticationError("Invalid credentials");
            }
            const token = jwt.sign({ userId: user.dataValues.uuid, email: user.dataValues.email }, process.env.jwtSecret, {
                expiresIn: "1h"
            });
            const decoded = jwt.decode(token);
            return { id: "auth", isAuth: true, userId: decoded.userId, token: token, tokenExpiration: decoded.exp };
        },
        news: async () => {
            try {
                const returnData = await News.findAll({ raw: true, order: [["createdAt", "DESC"]] });
                const returnStuff = {
                    id: "news",
                    news: returnData
                };
                return returnStuff;
            } catch (error) {
                console.log(error);
                throw new Error("News data error");
            }
        },
        reunion: async () => {
            try {
                const returnData = await Reunion.findAll({ raw: true, order: [["createdAt", "DESC"]] });
                console.log(returnData);

                const returnStuff = {
                    id: "reunion",
                    reunions: returnData
                };
                return returnStuff;
            } catch (error) {
                console.log(error);
                throw new Error("Reunion data error");
            }
        }
    }
};
