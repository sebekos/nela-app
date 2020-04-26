const { gql } = require("apollo-server");

const typeDefs = gql`
    input NewsInput {
        title: String!
        text: String!
    }

    input ReunionInput {
        title: String!
        text: String!
    }

    input UpdateNewsInput {
        id: Int!
        title: String!
        text: String!
    }

    input UpdateReunionInput {
        id: Int!
        title: String!
        text: String!
    }

    type News {
        id: Int!
        title: String!
        text: String!
        createdAt: String!
    }

    type Reunion {
        id: Int!
        title: String!
        text: String!
        createdAt: String!
    }

    type NewsData {
        id: String!
        news: [News!]!
    }

    type ReunionData {
        id: String!
        reunion: [Reunion!]!
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
        news: NewsData!
        reunion: ReunionData!
    }

    type Mutation {
        addNews(newsInput: NewsInput): News
        updateNews(updateNewsInput: UpdateNewsInput): News
        addReunion(reunionInput: ReunionInput): Reunion
        updateReunion(updateReunionInput: UpdateReunionInput): Reunion
    }
`;

module.exports = typeDefs;
