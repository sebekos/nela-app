module.exports = `
input GalleryInput {
    title: String!
    text: String!
}

input UpdateGalleryInput {
    id: Int!
    title: String!
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
    addGallery(galleryInput: GalleryInput): Boolean
    updateGallery(updateGalleryInput: UpdateGalleryInput): Gallery
    deletePhotos(photos: [Int!]!, galleryid: Int!): Boolean
    deleteGallery(id: Int!): Boolean
}
`;
