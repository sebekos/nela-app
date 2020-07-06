const { Thank } = require("../../../sequelize");

module.exports = {
    thanks: async () => {
        try {
            const returnData = await Thank.findAll({ where: { deleted: 0 }, order: [["createdAt", "DESC"]], limit: 9 });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
