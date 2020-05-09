module.exports = `
input PersonInput {
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
}

input UpdatePersonInput {
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
}

type Person {
    id: String!
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
    createdAt: String!
}

extend type Query {
    person(filter: Int): Person!
    people: [Person!]
}

extend type Mutation {
    addPerson(personInput: PersonInput): Person
    updatePerson(updatePersonInput: UpdatePersonInput): Person
}
`;
