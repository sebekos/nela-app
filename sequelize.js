const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const NewsModel = require("./models/news");
const ReunionModel = require("./models/reunion");
const HappenedModel = require("./models/happened");
const HelloModel = require("./models/hello");
const LaterModel = require("./models/later");
const dotenv = require("dotenv");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false
});

const User = UserModel(sequelize, Sequelize);
const News = NewsModel(sequelize, Sequelize);
const Reunion = ReunionModel(sequelize, Sequelize);
const Happened = HappenedModel(sequelize, Sequelize);
const Hello = HelloModel(sequelize, Sequelize);
const Later = LaterModel(sequelize, Sequelize);

try {
    sequelize.sync();
    console.log("MySQL Connected...");
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

module.exports = { User, News, Reunion, Happened, Hello, Later };
