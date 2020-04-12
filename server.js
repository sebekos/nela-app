const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// Init express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define routes
//app.use("/api/auth", require("./routes/api/auth"));
//app.use("/api/user", require("./routes/api/user"));

// Setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
