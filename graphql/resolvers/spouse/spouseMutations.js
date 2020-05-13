const { Spouse, Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, spouse_key } = args.spouseInput;
        const spouseFields = {
            person_key,
            spouse_key,
            deleted: 0
        };
        spouseFields.lastUser = context.userId;
        spouseFields.createdUser = context.userId;
        try {
            const checkSpouse = await Person.findOne({ where: { id: spouse_key } });
            if (!checkSpouse) {
                throw new Error("Spouse not found");
            }
            const spause = await Spouse.create(spouseFields);
            return spause;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const spouseFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Spouse.update(spouseFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
