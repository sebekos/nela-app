const { gql } = require("apollo-server-express");
const news = require("./news");
const reunion = require("./reunion");
const auth = require("./auth");
const familynews = require("./familynews");
const gallery = require("./gallery");
const person = require("./person");
const parent = require("./parent");

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
    ${person}
    ${parent}
`;

module.exports = typeDefs;
