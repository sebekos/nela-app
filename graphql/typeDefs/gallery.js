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
    thumb_1: String
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

type Photo {
    id: Int!
    key: Int!
    order: Int!
    link_main: String!
    link_thumb: String!
    deleted: Int!
    createdAt: String!
}

extend type Query {
    ui_galleries: Galleries!
    galleries: Galleries!
    gallery(filter: Int!): Gallery!
    photos(filter: Int!): [Photo!]!
}

extend type Mutation {
    addGallery(galleryInput: GalleryInput): Gallery
    updateGallery(updateGalleryInput: UpdateGalleryInput): Gallery
    galleryUpload(files: [GalleryUpload!]!, galleryId: Int!): Boolean!
}
`;
