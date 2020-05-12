const news = require("./news/newsMutations");
const reunion = require("./reunion/reunionMutations");
const familynews = require("./familynews/familynewsMutations");
const gallery = require("./gallery/galleryMutations");
const person = require("./person/personMutations");
const parent = require("./parent/parentMutations");

module.exports = {
    Mutation: {
        ...news,
        ...reunion,
        ...familynews,
        ...gallery,
        ...person,
        ...parent
    }
};
