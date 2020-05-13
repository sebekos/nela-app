const auth = require("./auth/authQueries");
const news = require("./news/newsQueries");
const reunion = require("./reunion/reunionQueries");
const familynews = require("./familynews/familynewsQueries");
const gallery = require("./gallery/galleryQueries");
const person = require("./person/personQueries");
const parent = require("./parent/parentQueries");
const child = require("./child/childQueries");
const sibling = require("./sibling/siblingQueries");
const spouse = require("./spouse/spouseQueries");

module.exports = {
    Query: {
        ...auth,
        ...news,
        ...reunion,
        ...familynews,
        ...gallery,
        ...person,
        ...parent,
        ...child,
        ...sibling,
        ...spouse
    }
};
