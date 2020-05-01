const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs/typeDefs");
const Queries = require("./graphql/resolvers/queries");
const Mutations = require("./graphql/resolvers/mutations");
const isAuth = require("./middleware/is-auth");

const server = new ApolloServer({
    typeDefs,
    resolvers: { ...Queries, ...Mutations },
    context: ({ req }) => {
        const authData = isAuth(req);
        return {
            ...authData,
            req
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
