module.exports = `
input SiblingInput {
    person_key: Int!
    child_key: Int!
}

type Sibling {
    id: Int!
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
}

extend type Query {
    siblings(filter: Int!): [Sibling!]
}

extend type Mutation {
    addSibling(siblingInput: SiblingInput): Sibling
    deleteSibling(id: Int!): Boolean
}
`;
