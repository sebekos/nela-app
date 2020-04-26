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

type ReunionData {
    id: String!
    reunion: [Reunion!]!
}

extend type Query {
    reunion: ReunionData!
}

extend type Mutation {
    addReunion(reunionInput: ReunionInput): Reunion
    updateReunion(updateReunionInput: UpdateReunionInput): Reunion
}
`;
