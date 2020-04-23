const { gql } = require("apollo-server");

const typeDefs = gql`
    type News {
        id: String!
        title: String!
        text: String!
        createdAt: String!
    }

    input NewsInput {
        title: String!
        text: String!
    }

    type AuthData {
        _id: Int!
        isAuth: Boolean!
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
        news: [News!]!
    }

    type Mutation {
        addNews(newsInput: NewsInput): News
    }
`;

module.exports = typeDefs;
