const { News } = require("../../../sequelize");

module.exports = {
    news: async () => {
        try {
            const returnData = await News.findAll({ where: { deleted: 0 }, order: [["createdAt", "DESC"]] });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
