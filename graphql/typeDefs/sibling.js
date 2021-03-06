module.exports = `
input SiblingInput {
    person_key: Int!
    sibling_key: Int!
}

type Sibling {
    tid: Int!
    id: Int!
    first_name: String
    middle_name: String
    last_name: String!
    link_photo: String
    birth_date: String
    passed_date: String
}

extend type Query {
    siblings(filter: Int!): [Sibling!]
}

extend type Mutation {
    addSibling(siblingInput: SiblingInput): Boolean
    deleteSibling(id: Int!): Boolean
}
`;
