const { User } = require("../../sequelize");
const { errorMsg } = require("../../utils/error");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

// @route       GET api/auth
// @description Get user
// @access      Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.user.id }, attributes: { exclude: ["password", "id"] } });
        res.json(user.dataValues);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/auth
// @description Authenticate user and get token
// @access      Public
router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json(errorMsg("Invalid credentials"));
            }
            const isMatch = await bcrypt.compare(password, user.dataValues.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            const payload = {
                user: {
                    id: user.dataValues.uuid
                }
            };
            // Expires in 1 hour
            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
