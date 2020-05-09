const { News } = require("../../../sequelize");

module.exports = {
    news: async () => {
        try {
            const returnData = await News.findAll({ order: [["createdAt", "DESC"]] });
            const returnStuff = {
                id: "news",
                news: returnData
            };
            return returnStuff;
        } catch (error) {
            throw new Error(err);
        }
    }
};
