const { User } = require("../../sequelize");
const { errorMsg } = require("../../utils/error");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

// @route       POST api/user
// @description Register user
// @access      Public
router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
        check("registerkey", "Register key is required").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.registerkey !== process.env.REGISTER_KEY) {
            return res.status(400).json(errorMsg("Please contact admin to get a registration key"));
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json(errorMsg("User already exists"));
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const returnUser = await User.create({ email: email, password: hashedPassword });
            const payload = {
                user: {
                    id: returnUser.dataValues.uuid
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
