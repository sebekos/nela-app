const { Gallery, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
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
            return gallery;
        } catch (err) {
            throw new Error(err);
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
            return gallery;
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
