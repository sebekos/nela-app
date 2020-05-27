const { News } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { title, text } = args.newsInput;
        const newsFields = {
            title,
            text,
            deleted: 0,
            createdUser: context.userId,
            lastUser: context.userId
        };
        try {
            const news = await News.create(newsFields);
            return news;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, title, text } = args.updateNewsInput;
        const newsFields = {
            title,
            text,
            lastUser: context.userId
        };
        try {
            let news = await News.update(newsFields, { where: { id } });
            news = await News.findOne({ where: { id } });
            return news;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const newsFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await News.update(newsFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
