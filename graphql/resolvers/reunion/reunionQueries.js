const { Reunion } = require("../../../sequelize");

module.exports = {
    reunion: async () => {
        try {
            const returnData = await Reunion.findAll({ order: [["createdAt", "DESC"]] });
            const returnStuff = {
                id: "reunion",
                reunion: returnData
            };
            return returnStuff;
        } catch (error) {
            throw new Error(err);
        }
    }
};
