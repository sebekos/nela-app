const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const NewsModel = require("./models/news");
const ReunionModel = require("./models/reunion");
const FamilyNewsModel = require("./models/familynews");
const GalleryModel = require("./models/gallery");
const PhotoModel = require("./models/photo");
const PersonModel = require("./models/person");
const RelateParentModel = require("./models/relation_parent");
const RelateChildModel = require("./models/relation_child");
const RelateSiblingModel = require("./models/relation_sibling");
const RelateSpouseModel = require("./models/relation_spouse");
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
const Person = PersonModel(sequelize, Sequelize);
const RelateParent = RelateParentModel(sequelize, Sequelize);
const RelateChild = RelateChildModel(sequelize, Sequelize);
const RelateSibling = RelateSiblingModel(sequelize, Sequelize);
const RelateSpouse = RelateSpouseModel(sequelize, Sequelize);

try {
    sequelize.sync();
    console.log("MySQL Connected...");
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

module.exports = {
    User,
    News,
    Reunion,
    FamilyNews,
    Gallery,
    Photo,
    Person,
    RelateParent,
    RelateChild,
    RelateSibling,
    RelateSpouse,
    sequelize
};
