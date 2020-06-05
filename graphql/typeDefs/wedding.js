module.exports = `
type Wedding {
    id: Int!
    date: String!
}

extend type Query {
    weddings(filter: Int): [Wedding]
}

extend type Mutation {
    addWedding(wedDate: String!, spouseId: Int!): Wedding
    updateWedding(id: Int!, wedDate: String!): Wedding
    deleteWedding(id: Int!): Boolean
}
`;
