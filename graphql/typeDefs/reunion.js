module.exports = `
input ReunionInput {
    title: String!
    text: String!
}

input UpdateReunionInput {
    id: Int!
    title: String!
    text: String!
}

type Reunion {
    id: Int!
    title: String!
    text: String!
    createdAt: String!
}

extend type Query {
    reunion: [Reunion!]
}

extend type Mutation {
    addReunion(reunionInput: ReunionInput): Reunion
    updateReunion(updateReunionInput: UpdateReunionInput): Reunion
}
`;
