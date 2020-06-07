const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const { Photo, Person } = require("../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const auth = require("../middleware/exp-auth");

router.post("/", auth, (req, res) => {
    const form = new multiparty.Form({
        uploadDir: `${__dirname}/../public/temp/`
    });
    form.parse(req, async (error, fields, files) => {
        // Constants
        const photoCnt = Object.keys(files).length;
        const galId = fields.galleryId;

        // Error check
        if (error) throw new Error(error);
        if (photoCnt % 2 !== 0 || photoCnt < 2) throw new Error("Server Error");

        // Check path
        const currPath = path.join(__dirname, `../public/images/gallery/${galId}`);
        if (!fs.existsSync(currPath)) {
            await fs.mkdirSync(currPath);
        }

        // Update names and path
        try {
            for (let i = 0; i < photoCnt / 2; i++) {
                // Unique ID
                let curUuid = uuid();

                // Set path after upload
                let path_reg = files[`reg-${i}`][0].path;
                await fs.renameSync(path_reg, `${currPath}/${curUuid}_reg.jpeg`);
                let path_thumb = files[`thumb-${i}`][0].path;
                await fs.renameSync(path_thumb, `${currPath}/${curUuid}_thumb.jpeg`);

                // Add to Photo MySQL
                const photoFields = {
                    key: galId,
                    order: 0,
                    link_main: `${curUuid}_reg.jpeg`,
                    link_thumb: `${curUuid}_thumb.jpeg`,
                    deleted: 0,
                    createdUser: "12345",
                    lastUser: "12345"
                };
                await Photo.create(photoFields);
            }
        } catch (error) {
            console.log(error);
            throw new Error("Server Error");
        }
        res.send(true);
    });
});

router.post("/avatar", auth, async (req, res) => {
    const form = new multiparty.Form({
        uploadDir: `${__dirname}/../public/temp/`
    });
    form.parse(req, async (error, fields, files) => {
        // Constants
        const photoCnt = Object.keys(files).length;
        const person_key = fields.person_key;

        // Error check
        if (error) throw new Error(error);
        if (photoCnt !== 1) throw new Error("Server Error");

        // Check path
        const currPath = path.join(__dirname, `../public/images/avatars`);
        if (!fs.existsSync(currPath)) {
            await fs.mkdirSync(currPath);
        }

        // Update names and path
        try {
            // Set path after upload
            let path_avatar = files[`avatar-${person_key}`][0].path;
            await fs.renameSync(path_avatar, `${currPath}/avatar_${person_key}.jpeg`);

            // Add to Photo MySQL
            const personFields = {
                link_photo: `avatar_${person_key}.jpeg`,
                lastUser: "12345"
            };
            await Person.update(personFields, { where: { id: person_key } });
        } catch (error) {
            console.log(error);
            throw new Error("Server Error");
        }
        res.send(true);
    });
});

module.exports = router;
