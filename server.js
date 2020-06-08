const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/typeDefs/typeDefs");
const Queries = require("./graphql/resolvers/queries");
const Mutations = require("./graphql/resolvers/mutations");
const isAuth = require("./middleware/is-auth");
const path = require("path");

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

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;

// Listen
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
