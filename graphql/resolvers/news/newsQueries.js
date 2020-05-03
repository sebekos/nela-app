const { News } = require("../../../sequelize");

module.exports = {
    news: async () => {
        try {
            const returnData = await News.findAll({ raw: true, order: [["createdAt", "DESC"]] });
            const returnStuff = {
                id: "news",
                news: returnData
            };
            return returnStuff;
        } catch (error) {
            console.log(error);
            throw new Error("News data error");
        }
    }
};
