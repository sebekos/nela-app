const { Gallery, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addGallery: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { title, text } = args.galleryInput;
        const { userId } = context;
        const galleryFields = {
            title,
            text,
            deleted: 0,
            createdUser: userId,
            lastUser: userId
        };
        try {
            await Gallery.create(galleryFields);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateGallery: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, title, text } = args.updateGalleryInput;
        const { userId } = context;
        const galleryFields = {
            title,
            text,
            lastUser: userId
        };
        try {
            let gallery = await Gallery.update(galleryFields, { where: { id } });
            gallery = await Gallery.findOne({ where: { id } });
            return gallery;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteGallery: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const { userId } = context;
        const galleryFields = {
            deleted: 1,
            lastUser: userId
        };
        try {
            await Gallery.update(galleryFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    deletePhotos: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { photos, galleryid } = args;
        try {
            await sequelize.query(`
                UPDATE main.photos SET
                deleted = 1
                WHERE \`key\` = ${galleryid}
                AND id NOT IN (${photos.join(", ")})
            `);
        } catch (error) {}
        return true;
    }
};
