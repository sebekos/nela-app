const { News } = require("../../sequelize");

module.exports = {
    Mutation: {
        addNews: async (_, args) => {
            if (!req.isAuth) {
                throw new Error("Unauthenticated!");
            }
            const { title, text } = args;
            const newsFields = {
                title,
                text
            };
            try {
                newsFields.createdUser = req.userId;
                newsFields.lastUser = req.userId;
                const news = await News.create(newsFields);
                return news.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        }
    }
};
