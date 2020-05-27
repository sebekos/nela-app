const { FamilyNews } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    familynews: async (_, args) => {
        try {
            const returnData = await FamilyNews.findAll({
                where: { type: args.filter ? args.filter : { [Op.ne]: 0 }, deleted: 0 },
                order: [["createdAt", "DESC"]]
            });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
