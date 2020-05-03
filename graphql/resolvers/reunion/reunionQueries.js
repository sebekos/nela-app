const { Reunion } = require("../../../sequelize");

module.exports = {
    reunion: async () => {
        try {
            const returnData = await Reunion.findAll({ raw: true, order: [["createdAt", "DESC"]] });
            const returnStuff = {
                id: "reunion",
                reunion: returnData
            };
            return returnStuff;
        } catch (error) {
            console.log(error);
            throw new Error("Reunion data error");
        }
    }
};
