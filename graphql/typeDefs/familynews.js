module.exports = `
input FamilyNewsInput {
    type: Int!
    text: String!
}

input UpdateFamilyNewsInput {
    id: Int!
    type: Int!
    text: String!
}

type FamilyNews {
    id: Int!
    type: Int!
    text: String!
    createdAt: String!
}

extend type Query {
    familynews(filter: Int): [FamilyNews!]
}

extend type Mutation {
    addFamilyNews(familyNewsInput: FamilyNewsInput): FamilyNews
    updateFamilyNews(updateFamilyNewsInput: UpdateFamilyNewsInput): FamilyNews
    deleteFamilyNews(id: Int!): Boolean
}
`;
