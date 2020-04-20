const express = require("express");
const path = require("path");
const graphqlHttp = require("express-graphql");
const isAuth = require("./middleware/is-auth");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

// Init express
const app = express();

// Middleware
app.use(isAuth);

// Init graphql
app.use(
    "/graphql",
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

// Setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
