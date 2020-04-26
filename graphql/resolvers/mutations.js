const { News, Reunion } = require("../../sequelize");

module.exports = {
    Mutation: {
        addNews: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated!");
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
        },
        addReunion: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated!");
            }
            const { title, text } = args.reunionInput;
            const reunionFields = {
                title,
                text,
                deleted: 0,
                createdUser: context.userId,
                lastUser: context.userId
            };
            try {
                const reunion = await Reunion.create(reunionFields);
                return reunion.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        updateReunion: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated!");
            }
            const { id, title, text } = args.reunionNewsInput;
            const reunionFields = {
                title,
                text,
                lastUser: context.userId
            };
            try {
                let reunion = await Reunion.update(reunionFields, { where: { id } });
                reunion = await Reunion.findOne({ where: { id } });
                return reunion.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        }
    }
};
