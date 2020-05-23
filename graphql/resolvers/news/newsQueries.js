const { News } = require("../../../sequelize");

module.exports = {
    news: async () => {
        try {
            const returnData = await News.findAll({ order: [["createdAt", "DESC"]] });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
