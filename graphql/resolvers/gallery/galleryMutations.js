const { Gallery } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server");
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
    // singleUpload: async (_, { file }, context) => {
    //     const { createReadStream, filename, mimetype } = await file;
    //     await new Promise((res) => {
    //         try {
    //             createReadStream()
    //                 .pipe(createWriteStream(path.join(__dirname, "../../images", filename)))
    //                 .on("close", res);
    //         } catch (error) {
    //             console.log(error);
    //             throw new Error("Server Error");
    //         }
    //     });
    //     return true;
    // },
    multiUpload: async (_, { files, galleryId }, context) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        // Check files
        const totalPhotos = Object.keys(files).length;
        if (totalPhotos < 1 || totalPhotos > 50) {
            throw new Error(`50 photo max, currently at ${totalPhotos}`);
        }
        // Check path
        const currPath = path.join(__dirname, `../../../images/gallery/${galleryId}`);
        if (!fs.existsSync(currPath)) {
            fs.mkdirSync(currPath);
        }
        for (let i = 0; i < totalPhotos; i++) {
            const { createReadStream } = await files[i];
            await new Promise((res) => {
                try {
                    createReadStream()
                        .pipe(createWriteStream(path.join(currPath, `${uuid()}.jpeg`)))
                        .on("close", res);
                } catch (error) {
                    throw new Error("Server Error");
                }
            });
        }
        return true;
    }
};
