const { Reunion } = require("../../../sequelize");

module.exports = {
    reunion: async () => {
        try {
            const returnData = await Reunion.findAll({ where: { deleted: 0 }, order: [["createdAt", "DESC"]] });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
