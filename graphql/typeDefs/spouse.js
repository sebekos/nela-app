module.exports = `
input SpouseInput {
    person_key: Int!
    spouse_key: Int!
    wed_date: String
}

type Spouse {
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
    spouses(filter: Int!): [Spouse!]
}

extend type Mutation {
    addSpouse(spouseInput: SpouseInput): Boolean
    deleteSpouse(id: Int!): Boolean
}
`;
