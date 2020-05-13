module.exports = `
input ChildInput {
    person_key: Int!
    child_key: Int!
}

type Child {
    id: Int!
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
}

extend type Query {
    children(filter: Int!): [Child!]
}

extend type Mutation {
    addChild(childInput: ChildInput): Child
    deleteChild(id: Int!): Boolean
}
`;
