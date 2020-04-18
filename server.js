const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");
const auth = require("./middleware/auth");

// Init express
const app = express();

// Init graphql
app.use(
    "/graphql",
    graphqlHTTP(async (req) => ({
        schema: schema,
        graphiql: true,
        context: auth(req)
    }))
);

// Setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
