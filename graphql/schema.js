const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require("graphql");
const { News } = require("../sequelize");

// News
const NewsType = new GraphQLObjectType({
    name: "News",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        createdAt: { type: GraphQLString }
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        news: {
            type: new GraphQLList(NewsType),
            resolve(parent, args) {
                return News.findAll();
            }
        }
    }
});

// // Mutation
// const mutation = new GraphQLObjectType({
//     name: "Mutations",
//     fields: {
//         addNews: {
//             type: NewsType,
//             args: {
//                 title: { type: new GraphQLNonNull(GraphQLString) },
//                 text: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent, args) {
//                  News.create({
//                     title: args.title,
//                     text: args.text
//                 })
//             }
//         }
//     }
// });

module.exports = new GraphQLSchema({
    query: RootQuery
});
