const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
input UserInput {
    email: String!
    password: String!
}
type RootQuery {
    news: [News!]!
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    addNews(newsInput: NewsInput): News
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
