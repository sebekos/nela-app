const { News } = require("../../sequelize");

module.exports = {
    Mutation: {
        addNews: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated!");
            }
            const { title, text } = args;
            const newsFields = {
                title,
                text,
                createdUser: context.userId,
                lastUser: context.userId
            };
            try {
                const news = await News.create(newsFields);
                return news.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        updateNews: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated!");
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
                return news.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        }
    }
};
