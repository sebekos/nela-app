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

type FamilyNewsData {
    id: String!
    familynews: [FamilyNews!]!
}

extend type Query {
    familynews(filter: Int): FamilyNewsData!
}

extend type Mutation {
    addFamilyNews(familyNewsInput: FamilyNewsInput): FamilyNews
    updateFamilyNews(updateFamilyNewsInput: UpdateFamilyNewsInput): FamilyNews
}
`;
