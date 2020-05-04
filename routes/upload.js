const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
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
        for (let i = 0; i < photoCnt / 2; i++) {
            let curUuid = uuid();
            let path_reg = files[`reg-${i}`][0].path;
            await fs.rename(path_reg, `${currPath}/${curUuid}_reg.jpeg`, () => console.log("renamed"));
            let path_thumb = files[`thumb-${i}`][0].path;
            await fs.rename(path_thumb, `${currPath}/${curUuid}_thumb.jpeg`, () => console.log("renamed"));
        }
    });
    res.send("gg");
});

module.exports = router;
