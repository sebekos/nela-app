const { FamilyNews } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    familynews: async (_, args) => {
        try {
            const returnData = await FamilyNews.findAll({
                raw: true,
                where: { type: args.filter ? args.filter : { [Op.ne]: 0 } },
                order: [["createdAt", "DESC"]]
            });
            const returnStuff = {
                id: "familynews",
                familynews: returnData
            };
            return returnStuff;
        } catch (error) {
            console.log(error);
            throw new Error("News data error");
        }
    }
};
