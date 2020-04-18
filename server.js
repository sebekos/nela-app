const express = require("express");
const path = require("path");

// Init express
const app = express();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/news", require("./routes/api/news"));

// Setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
