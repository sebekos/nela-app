const news = require("./news/newsMutations");
const reunion = require("./reunion/reunionMutations");
const familynews = require("./familynews/familynewsMutations");
const gallery = require("./gallery/galleryMutations");
const person = require("./person/personMutations");
const parent = require("./parent/parentMutations");
const child = require("./child/childMutations");
const sibling = require("./sibling/siblingMutations");
const spouse = require("./spouse/spouseMutations");
const thank = require("./thank/thankMutations");

module.exports = {
    Mutation: {
        ...news,
        ...reunion,
        ...familynews,
        ...gallery,
        ...person,
        ...parent,
        ...child,
        ...sibling,
        ...spouse,
        ...thank
    }
};
