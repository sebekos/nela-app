const mysql = require("mysql");
const dotenv = require("dotenv");
require("dotenv").config();

const connectDB = async () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
    try {
        connection.connect();
        console.log("MySQL Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
