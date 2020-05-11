const { RelateParent } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const parentFields = {
            person_key: args.person_key,
            parent_key: args.parent_key,
            deleted: 0
        };
        parentFields.lastUser = context.userId;
        parentFields.createdUser = context.userId;
        try {
            const parent = await RelateParent.create(parentFields);
            return parent;
        } catch (err) {
            throw new Error(err);
        }
    }
};
