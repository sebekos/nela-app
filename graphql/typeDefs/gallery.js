module.exports = `
input GalleryInput {
    title: String!
    text: String!
}

input UpdateGalleryInput {
    id: Int!
    title: Int!
    text: String!
}

type Gallery {
    id: Int!
    title: String!
    text: String!
    createdAt: String!
}

type Galleries {
    id: String!
    galleries: [Gallery!]!
}

type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

input GalleryUpload{
    reg: Upload!
    thumbnail: Upload!
}

extend type Query {
    galleries: Galleries!
    gallery(filter: Int!): Gallery!
}

extend type Mutation {
    addGallery(galleryInput: GalleryInput): Gallery
    updateGallery(updateGalleryInput: UpdateGalleryInput): Gallery
    galleryUpload(files: [GalleryUpload!]!, galleryId: Int!): Boolean!
}
`;
