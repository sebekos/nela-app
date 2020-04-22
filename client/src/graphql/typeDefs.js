import { gql } from "apollo-boost";

const typeDefs = gql`
    extend type RootQuery {
        isLoggedIn: Boolean!
    }
`;

export default typeDefs;
