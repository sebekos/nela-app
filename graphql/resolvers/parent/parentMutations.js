const { Parent, Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, parent_key } = args.parentInput;
        const parentFields = {
            person_key,
            parent_key,
            deleted: 0
        };
        parentFields.lastUser = context.userId;
        parentFields.createdUser = context.userId;
        try {
            const checkParent = await Person.findOne({ where: { id: parent_key } });
            if (!checkParent) {
                throw new Error("Parent not found");
            }
            const parent = await Parent.create(parentFields);
            return parent;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const parentFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Parent.update(parentFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
