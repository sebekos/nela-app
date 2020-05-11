module.exports = `
input ParentInput {
    person_key: Int!
    parent_key: Int!
    deleted: Int!
    createdUser: Int!
    lastUser: Int!
}

type Parent {
    person_key: Int!
    parent_key: Int!
}

extend type Query {
    parent(filter: Int): Parent
}

extend type Mutation {
    addParent(parentInput: ParentInput): Parent
}
`;
