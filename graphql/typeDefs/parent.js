module.exports = `
input ParentInput {
    person_key: Int!
    parent_key: Int!
}

type ParentRelation {
    person_key: Int!
    parent_key: Int!
}

type Parent {
    id: Int!
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
}

type ParentData {
    id: String!
    parents: [Parent!]
}

extend type Query {
    parents(filter: Int!): [Parent!]
}

extend type Mutation {
    addParent(parentInput: ParentInput): Boolean
    deleteParent(id: Int!): Boolean
}
`;
