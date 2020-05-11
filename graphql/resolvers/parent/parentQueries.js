const { RelateParent } = require("../../../sequelize");

module.exports = {
    parents: async (_, args) => {
        try {
            const returnData = await RelateParent.findAll({
                where: { person_key: args.id }
            });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
