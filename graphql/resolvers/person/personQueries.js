const { Person } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    person: async (_, args) => {
        try {
            const returnData = await Person.findOne({
                where: { id: args.filter ? args.filter : { [Op.ne]: 0 }, deleted: 0 },
                order: [["createdAt", "DESC"]]
            });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    },
    people: async (_, args) => {
        try {
            const returnData = await Person.findAll({ order: [["updatedAt", "DESC"]], where: { deleted: 0 } });
            const returnStuff = {
                id: "people",
                people: returnData
            };
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
