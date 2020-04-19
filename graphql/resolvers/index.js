const authResolver = require("./auth");
const newsResolver = require("./news");

const rootResolver = {
    ...authResolver,
    ...newsResolver
};

module.exports = rootResolver;
