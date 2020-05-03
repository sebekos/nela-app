const { Gallery, Photo } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const { uuid } = require("uuidv4");
const fs = require("fs");
const path = require("path");

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
            return gallery;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    },
    galleryUpload: async (_, { files, galleryId }, context) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        // Check files
        const totalPhotos = files.length;
        if (totalPhotos < 1 || totalPhotos > 50) {
            throw new Error(`50 photo max, currently at ${totalPhotos}`);
        }
        // Check path
        const currPath = path.join(__dirname, `../../../public/images/gallery/${galleryId}`);
        if (!fs.existsSync(currPath)) {
            fs.mkdirSync(currPath);
        }
        for (let i = 0; i < totalPhotos; i++) {
            const { createReadStream: reg_stream } = await files[i].reg;
            const { createReadStream: thumbnail_stream } = await files[i].thumbnail;
            const imageUuid = uuid();
            const imageName_reg = `${imageUuid}_reg.jpeg`;
            const imagePath_reg = path.join(currPath, imageName_reg);
            const imageName_thumbnail = `${imageUuid}_thumbnail.jpeg`;
            const imagePath_thumbnail = path.join(currPath, imageName_thumbnail);
            const photoData = {
                key: galleryId,
                order: 0,
                link_main: imageName_reg,
                link_thumb: imageName_thumbnail,
                createdUser: context.userId,
                lastUser: context.userId,
                deleted: 0
            };
            try {
                await new Promise(async (res) => {
                    reg_stream().pipe(createWriteStream(imagePath_reg)).on("close", res);
                    thumbnail_stream().pipe(createWriteStream(imagePath_thumbnail)).on("close", res);
                });
                await Photo.create(photoData);
            } catch (error) {
                console.log(error);
                throw new Error("Server Error");
            }
        }
        return true;
    }
};
