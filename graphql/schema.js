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
        createdAt: { type: GraphQLString }
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

// Root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        news: {
            type: new GraphQLList(NewsType),
            resolve(parent, args, content) {
                return News.findAll();
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
