const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const NewsModel = require("./models/news");
const ReunionModel = require("./models/reunion");
const FamilyNewsModel = require("./models/familynews");
const GalleryModel = require("./models/gallery");
const PhotoModel = require("./models/photo");
const dotenv = require("dotenv");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
    query: { raw: true }
});

const User = UserModel(sequelize, Sequelize);
const News = NewsModel(sequelize, Sequelize);
const Reunion = ReunionModel(sequelize, Sequelize);
const FamilyNews = FamilyNewsModel(sequelize, Sequelize);
const Gallery = GalleryModel(sequelize, Sequelize);
const Photo = PhotoModel(sequelize, Sequelize);

try {
    sequelize.sync();
    console.log("MySQL Connected...");
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

module.exports = { User, News, Reunion, FamilyNews, Gallery, Photo, sequelize };
