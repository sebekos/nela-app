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

extend type Query {
    galleries: Galleries!
}

extend type Mutation {
    addGallery(galleryInput: GalleryInput): Gallery
    updateGallery(updateGalleryInput: UpdateGalleryInput): Gallery
}
`;
