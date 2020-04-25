const { gql } = require("apollo-server");

const typeDefs = gql`
    type News {
        id: Int!
        title: String!
        text: String!
        createdAt: String!
    }

    input NewsInput {
        title: String!
        text: String!
    }

    input UpdateNewsInput {
        id: Int!
        title: String!
        text: String!
    }

    type AuthData {
        id: String!
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
        updateNews(updateNewsInput: UpdateNewsInput): News
    }
`;

module.exports = typeDefs;
