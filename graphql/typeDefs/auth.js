module.exports = `
type AuthData {
    id: String!
    isAuth: Boolean!
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

extend type Query {
    login(email: String!, password: String!): AuthData!
}

extend type Mutation {
    register(email: String!, password: String!, key: String!): Boolean
}
`;
