const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs/typeDefs");
const Queries = require("./graphql/resolvers/queries");
const Mutations = require("./graphql/resolvers/mutations");

const server = new ApolloServer({
    typeDefs,
    resolvers: { ...Queries, ...Mutations }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
