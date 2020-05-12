module.exports = `
input ParentInput {
    person_key: Int!
    parent_key: Int!
}

type Parent {
    person_key: Int!
    parent_key: Int!
}

extend type Query {
    parents(filter: Int): Parent
}

extend type Mutation {
    addParent(parentInput: ParentInput): Parent
    deleteParent(id: Int!): Boolean
}
`;
