const { Parent } = require("../../../sequelize");

module.exports = {
    parents: async (_, args) => {
        try {
            const returnData = await Parent.findAll({
                where: { person_key: args.filter }
            });
            return returnData;
        } catch (err) {
            throw new Error(err);
        }
    }
};
