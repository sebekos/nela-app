const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require("graphql");
const { News, User } = require("../sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

// News
const NewsType = new GraphQLObjectType({
    name: "News",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

// Login
const LoginType = new GraphQLObjectType({
    name: "Login",
    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

// User
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        uuid: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        news: {
            type: new GraphQLList(NewsType),
            resolve(parent, args, content) {
                return News.findAll();
            }
        },
        user: {
            type: new GraphQLList(UserType),
            async resolve(parent, args, content) {
                if (!content.user) {
                    throw new Error("Unauthorized Access");
                }
                return User.findAll({ where: { uuid: content.user.id } });
            }
        }
    }
});

// Mutation
const mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        login: {
            type: LoginType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let user = await User.findOne({ where: { email: args.email } });
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                const isMatch = await bcrypt.compare(args.password, user.dataValues.password);
                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }
                const payload = {
                    user: {
                        id: user.dataValues.uuid
                    }
                };
                const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 });
                return {
                    email: user.dataValues.email,
                    password: token
                };
            }
        },
        addNews: {
            type: NewsType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, content) {
                if (!content.user) {
                    throw new Error("Unauthorized");
                }
                const { title, text } = args;
                const newsFields = {
                    title,
                    text
                };
                try {
                    newsFields.createdUser = content.user.id;
                    newsFields.lastUser = content.user.id;
                    const news = await News.create(newsFields);
                    return news.dataValues;
                } catch (err) {
                    throw new Error("Server Error");
                }
            }
        },
        editNews: {
            type: NewsType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, content) {
                if (!content.user) {
                    throw new Error("Unauthorized");
                }
                const { id, title, text } = args;
                const newsFields = {
                    title,
                    text,
                    lastUser: content.user.id
                };
                try {
                    newsFields.lastUser = content.user.id;
                    let news = await News.update(newsFields, { where: { id } });
                    news = await News.findOne({ where: { id } });
                    return news.dataValues;
                } catch (err) {
                    throw new Error("Server Error");
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
