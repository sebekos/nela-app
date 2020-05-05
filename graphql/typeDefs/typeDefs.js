const { gql } = require("apollo-server-express");
const news = require("./news");
const reunion = require("./reunion");
const auth = require("./auth");
const familynews = require("./familynews");
const gallery = require("./gallery");

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
    ${gallery}
`;

module.exports = typeDefs;
