const { gql } = require("apollo-server");
const news = require("./news");
const reunion = require("./reunion");
const auth = require("./auth");
const familynews = require("./familynews");

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
    ${familynews}
`;

module.exports = typeDefs;
