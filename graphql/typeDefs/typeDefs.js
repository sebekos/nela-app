const { gql } = require("apollo-server");
const news = require("./news");
const reunion = require("./reunion");
const auth = require("./auth");

const typeDefs = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    ${auth}
    ${news}
    ${reunion}
`;

module.exports = typeDefs;
