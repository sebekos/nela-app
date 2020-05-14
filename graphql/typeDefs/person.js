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
    id: Int!
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
}

type Person {
    id: Int
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
    createdAt: String!
}

type SearchResults {
    id: String!
    results: [Person!]
}

extend type Query {
    person(filter: Int): Person
    people: [Person!]
    searchPeople(search: String!): SearchResults!
}

extend type Mutation {
    addPerson(personInput: PersonInput): Person
    updatePerson(updatePersonInput: UpdatePersonInput): Person
    deletePerson(id: Int!): Boolean!
}
`;
