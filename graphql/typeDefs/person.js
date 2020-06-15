module.exports = `
input PersonInput {
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    birth_location: String
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
    birth_location: String
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
    birth_location: String
    link_photo: String
    notes: String
    createdAt: String!
}

type RelationPerson {
    tid: Int
    id: Int
    relation: String
    info_date: String
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

type AlphaCount {
    A: Int
    B: Int
    C: Int
    D: Int
    E: Int
    F: Int
    G: Int
    H: Int
    I: Int
    J: Int
    K: Int
    L: Int
    M: Int
    N: Int
    O: Int
    P: Int
    Q: Int
    R: Int
    S: Int
    T: Int
    U: Int
    V: Int
    W: Int
    X: Int
    Y: Int
    Z: Int
}

extend type Query {
    person(filter: Int): Person
    people: [Person!]
    searchPeople(search: String!): SearchResults!
    familySearchPeople(search: String!): SearchResults!
    relations(filter: Int): [RelationPerson!]
    alphaSearch: AlphaCount!
}

extend type Mutation {
    addPerson(personInput: PersonInput): Person
    updatePerson(updatePersonInput: UpdatePersonInput): Person
    deletePerson(id: Int!): Boolean!
}
`;
