import gql from "graphql-tag";

const typeDefs = gql`
    type Query {
        loaduser: Boolean!
        logout: Boolean!
    }
    type Mutation {
        removePerson(id: Int!): Boolean!
    }
`;

export default typeDefs;
