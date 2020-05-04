const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/typeDefs/typeDefs");
const Queries = require("./graphql/resolvers/queries");
const Mutations = require("./graphql/resolvers/mutations");
const isAuth = require("./middleware/is-auth");

// Graphql setup
const server = new ApolloServer({
    typeDefs,
    resolvers: { ...Queries, ...Mutations },
    context: ({ req }) => {
        const data = isAuth(req);
        return data;
    }
});

// Init express
const app = express();

// Express routes
app.use(express.static("public"));
app.use("/upload", require("./routes/upload"));

// Apply middleware
server.applyMiddleware({ app });

// Listen
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`));
