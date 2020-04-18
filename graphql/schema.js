const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

// News
const News = new GraphQLObjectType({
    name: "News",
    fields: () => ({
        createdUser: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString }
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        news: {
            type: new GraphQLList(News),
            resolve(parent, args) {}
        }
    }
});
