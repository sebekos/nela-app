module.exports = `
input PersonInput {
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
    createdUser: String!
    lastUser: String!
}

input UpdatePersonInput {
    first_name: String
    middle_name: String
    last_name: String!
    birth_date: String
    passed_date: String
    link_photo: String
    notes: String
    lastUser: String!
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
}

extend type Mutation {
    addPerson(personInput: PersonInput): Person
    updatePerson(updatePersonInput: UpdatePersonInput): Person
}
`;
// input NewsInput {
//     title: String!
//     text: String!
// }

// input UpdateNewsInput {
//     id: Int!
//     title: String!
//     text: String!
// }

// type News {
//     id: Int!
//     title: String!
//     text: String!
//     createdAt: String!
// }

// type NewsData {
//     id: String!
//     news: [News!]!
// }

// extend type Query {
//     news: NewsData!
// }

// extend type Mutation {
//     addNews(newsInput: NewsInput): News
//     updateNews(updateNewsInput: UpdateNewsInput): News
// }
