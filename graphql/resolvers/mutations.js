const news = require("./news/newsMutations");
const reunion = require("./reunion/reunionMutations");
const familynews = require("./familynews/familynewsMutations");
const gallery = require("./gallery/galleryMutations");

module.exports = {
    Mutation: {
        ...news,
        ...reunion,
        ...familynews,
        ...gallery
    }
};
