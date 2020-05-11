import gql from "graphql-tag";

const typeDefs = gql`
    type Query {
        loaduser: Boolean!
        logout: Boolean!
    }
`;

export default typeDefs;
