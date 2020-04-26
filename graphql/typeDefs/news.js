module.exports = `
input NewsInput {
    title: String!
    text: String!
}

input UpdateNewsInput {
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

type NewsData {
    id: String!
    news: [News!]!
}

extend type Query {
    news: NewsData!
}

extend type Mutation {
    addNews(newsInput: NewsInput): News
    updateNews(updateNewsInput: UpdateNewsInput): News
}
`;
