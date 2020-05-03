const { Gallery } = require("../../../sequelize");

module.exports = {
    galleries: async () => {
        try {
            const returnData = await Gallery.findAll({ raw: true, order: [["createdAt", "DESC"]] });
            const returnStuff = {
                id: "galleries",
                galleries: returnData
            };
            return returnStuff;
        } catch (error) {
            console.log(error);
            throw new Error("News data error");
        }
    },
    gallery: async (_, args) => {
        const id = args.filter;
        try {
            const returnData = await Gallery.findOne({ where: { id } });
            return returnData;
        } catch (error) {
            console.log(error);
            throw new Error("News data error");
        }
    }
};
