module.exports = `
input ThankInput {
    text: String!
}

input UpdateThankInput {
    id: Int!
    text: String!
}

type Thank {
    id: Int!
    text: String!
    createdAt: String!
}

extend type Query {
    thanks: [Thank!]
}

extend type Mutation {
    addThank(thankInput: ThankInput): Thank
    updateThank(updateThankInput: UpdateThankInput): Thank
    deleteThank(id: Int!): Boolean
}
`;
