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

extend type Query {
    news: [News!]
}

extend type Mutation {
    addNews(newsInput: NewsInput): News
    updateNews(updateNewsInput: UpdateNewsInput): News
}
`;
