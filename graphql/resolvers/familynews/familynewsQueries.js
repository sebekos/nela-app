const { FamilyNews } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    familynews: async (_, args) => {
        try {
            const returnData = await FamilyNews.findAll({
                where: { type: args.filter ? args.filter : { [Op.ne]: 0 } },
                order: [["createdAt", "DESC"]]
            });
            const returnStuff = {
                id: "familynews",
                familynews: returnData
            };
            return returnStuff;
        } catch (error) {
            throw new Error(err);
        }
    }
};
