const { News } = require("../../sequelize");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

// @route   GET api/news
// @desc    Get news
// @access  Public
router.get("/", async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/office
// @description Create or update office information
// @access      Private
router.post(
    "/",
    [auth, [check("title", "Title is required").not().isEmpty(), check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, text } = req.body;

        // Build news object
        const newsFields = {
            title,
            text
        };

        try {
            // Update entry
            if (req.body.id) {
                console.log("update");
                newsFields.lastUser = req.user.id;
                let news = await News.update(newsFields, { where: { id: req.body.id } });
                news = await News.findOne({ where: { id: req.body.id } });
                return res.send(news);
            }
            // Create new
            newsFields.createdUser = req.user.id;
            newsFields.lastUser = req.user.id;
            const news = await News.create(newsFields);
            res.send(news.dataValues);
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
