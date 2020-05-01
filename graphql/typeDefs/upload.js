module.exports = `
type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

extend type Mutation {
    singleUpload(file: Upload!): Boolean!
}
`;
