const { News, Reunion, FamilyNews, Gallery } = require("../../sequelize");
const { AuthenticationError } = require("apollo-server");
const { createWriteStream } = require("fs");
const path = require("path");

module.exports = {
    Mutation: {
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
                return news.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
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
                return news.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        addReunion: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new AuthenticationError("Unauthenticated!");
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
                throw new AuthenticationError("Unauthenticated!");
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
        },
        addFamilyNews: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new AuthenticationError("Unauthenticated!");
            }
            const { text, type } = args.familyNewsInput;
            const familyNewsFields = {
                type,
                text,
                deleted: 0,
                createdUser: context.userId,
                lastUser: context.userId
            };
            try {
                const familynews = await FamilyNews.create(familyNewsFields);
                return familynews.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        updateFamilyNews: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new AuthenticationError("Unauthenticated!");
            }
            const { id, text, type } = args.updateFamilyNewsInput;
            const familyNewsFields = {
                text,
                type,
                lastUser: context.userId
            };
            try {
                let familynews = await FamilyNews.update(familyNewsFields, { where: { id } });
                familynews = await FamilyNews.findOne({ where: { id } });
                return familynews.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        addGallery: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new AuthenticationError("Unauthenticated!");
            }
            const { title, text } = args.galleryInput;
            const galleryFields = {
                title,
                text,
                deleted: 0,
                createdUser: context.userId,
                lastUser: context.userId
            };
            try {
                const gallery = await Gallery.create(galleryFields);
                return gallery.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        updateGallery: async (obj, args, context, info) => {
            if (!context.isAuth) {
                throw new AuthenticationError("Unauthenticated!");
            }
            const { id, title, text } = args.updateGalleryInput;
            const galleryFields = {
                title,
                text,
                lastUser: context.userId
            };
            try {
                let gallery = await Gallery.update(galleryFields, { where: { id } });
                gallery = await Gallery.findOne({ where: { id } });
                return gallery.dataValues;
            } catch (err) {
                console.log(err);
                throw new Error("Server Error");
            }
        },
        singleUpload: async (_, { file }, context) => {
            const { createReadStream, filename, mimetype } = await file;
            await new Promise((res) => {
                try {
                    createReadStream()
                        .pipe(createWriteStream(path.join(__dirname, "../../images", filename)))
                        .on("close", res);
                } catch (error) {
                    console.log(error);
                    throw new Error("Server Error");
                }
            });
            return true;
        },
        multiUpload: async (_, { files, galleryId }, context) => {
            const totalPhotos = Object.keys(files).length;
            if (totalPhotos < 1 || totalPhotos > 50) {
                throw new Error(`50 photo max, currently at ${totalPhotos}`);
            }
            for (let i = 0; i < totalPhotos; i++) {
                const { createReadStream, filename, mimetype } = await files[i];
                await new Promise((res) => {
                    try {
                        createReadStream()
                            .pipe(createWriteStream(path.join(__dirname, "../../images", `${galleryId}-${i}.jpeg`)))
                            .on("close", res);
                    } catch (error) {
                        console.log("error");
                        console.log(error);
                        throw new Error("Server Error");
                    }
                });
            }
            return true;
        }
    }
};
