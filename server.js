const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");

// Init express
const app = express();

// Init Middleware
app.use(express.json());

// Init graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

// Setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
