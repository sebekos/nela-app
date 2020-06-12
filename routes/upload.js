const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const uuid = require("uuid");
const fs = require("fs");
const { Photo, Person } = require("../sequelize");
const { AuthenticationError } = require("apollo-server-express");
const auth = require("../middleware/exp-auth");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const FileType = require("file-type");
const dotenv = require("dotenv");
require("dotenv").config();

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: process.env.AWS_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

router.post("/", auth, (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        // Check for data
        if (fields === undefined || files === undefined) throw new Error("Data not received correctly");

        // Constants
        const photoCnt = Object.keys(files).length;
        const galId = fields.galleryId;

        // Error check
        if (error) throw new Error(error);
        if (photoCnt % 2 !== 0 || photoCnt < 2) throw new Error("File error");

        // Upload files
        let returnUrls = null;
        await Promise.all(
            Object.keys(files).map(async (photo) => {
                let fieldName = files[photo][0].fieldName;
                let path = files[photo][0].path;
                let buffer = fs.readFileSync(path);
                let type = await FileType.fromBuffer(buffer);
                let curUuid = uuid();
                let fileName = `gallery/${galId}/${curUuid}-${fieldName}`;
                return new Promise((resolve, reject) => resolve(uploadFile(buffer, fileName, type)));
            })
        )
            .then((results) => {
                returnUrls = results.map((item) => {
                    return item.Location;
                });
            })
            .catch((err) => {
                return res.status(400).json({ errors: [{ msg: "S3 Error" }] });
            });
        for (let i = 0; i < photoCnt / 2; i++) {
            // Add to Photo MySQL
            const photoFields = {
                key: galId,
                order: 0,
                link_main: returnUrls[i * 2],
                link_thumb: returnUrls[i * 2 + 1],
                deleted: 0,
                createdUser: res.locals.user.userId,
                lastUser: res.locals.user.userId
            };
            await Photo.create(photoFields);
        }
        res.send(true);
    });
});

router.post("/avatar", [auth], async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        // Check for data
        if (fields === undefined || files === undefined) throw new Error("Data not received correctly");

        // Constants
        const photoCnt = Object.keys(files).length;

        // Error check
        if (error) throw new Error(error);
        if (photoCnt !== 1) throw new Error("Server Error");

        try {
            // File info
            const person_key = fields["person_key"][0];
            const path = files["image"][0]["path"];
            const buffer = fs.readFileSync(path);
            const type = await FileType.fromBuffer(buffer);
            const timestamp = Date.now().toString();
            const fileName = `avatars/${person_key}-${timestamp}`;
            const data = await uploadFile(buffer, fileName, type);

            if (data) {
                // Add to Photo MySQL
                const personFields = {
                    link_photo: Object.entries(data)[1][1],
                    lastUser: res.locals.user.userId
                };
                await Person.update(personFields, { where: { id: person_key } });
            } else {
                throw new Error("Upload error");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Server Error");
        }
        res.send(true);
    });
});

module.exports = router;
