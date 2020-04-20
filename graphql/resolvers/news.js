const { News } = require("../../sequelize");

module.exports = {
    news: async () => {
        try {
            const returnData = News.findAll();
            return returnData;
        } catch (error) {
            throw new error("News data error");
        }
    },
    addNews: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        const { title, text } = args.newsInput;
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
};
