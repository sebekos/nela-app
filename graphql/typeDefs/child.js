module.exports = `
input ChildInput {
    person_key: Int!
    child_key: Int!
}

type Child {
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
    children(filter: Int!): [Child!]
}

extend type Mutation {
    addChild(childInput: ChildInput): Boolean
    deleteChild(id: Int!): Boolean
}
`;
