const { Person } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    person: async (_, args) => {
        try {
            const returnData = await Person.findOne({
                where: { type: args.filter ? args.filter : { [Op.ne]: 0 } },
                order: [["createdAt", "DESC"]]
            });
            return returnData;
        } catch (error) {
            console.log(error);
            throw new Error("News data error");
        }
    }
};
