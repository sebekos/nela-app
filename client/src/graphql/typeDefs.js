import gql from "graphql-tag";

const typeDefs = gql`
    type Person {
        id: Int
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

    type Query {
        loaduser: Boolean!
        logout: Boolean!
        search: SearchResults!
    }

    type Mutation {
        set_family_tab: Boolean!
        set_family_letter: Boolean!
        set_news_tab: Boolean!
    }
`;

export default typeDefs;
