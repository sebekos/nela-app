const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs/typeDefs");
const Queries = require("./graphql/resolvers/queries");
const Mutations = require("./graphql/resolvers/mutations");
const isAuth = require("./middleware/is-auth");

const server = new ApolloServer({
    typeDefs,
    resolvers: { ...Queries, ...Mutations },
    context: ({ req }) => {
        const data = isAuth(req);
        return data;
    }
});

const app = express();
app.use(express.static("public"));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
