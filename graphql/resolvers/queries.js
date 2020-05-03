const auth = require("./auth/authQueries");
const news = require("./news/newsQueries");
const reunion = require("./reunion/reunionQueries");
const familynews = require("./familynews/familynewsQueries");
const gallery = require("./gallery/galleryQueries");

module.exports = {
    Query: {
        ...auth,
        ...news,
        ...reunion,
        ...familynews,
        ...gallery
    }
};
