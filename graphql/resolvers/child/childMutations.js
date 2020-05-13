const { Child, Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addChild: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, child_key } = args.childInput;
        const childFields = {
            person_key,
            child_key,
            deleted: 0
        };
        childFields.lastUser = context.userId;
        childFields.createdUser = context.userId;
        try {
            const checkChild = await Person.findOne({ where: { id: child_key } });
            if (!checkChild) {
                throw new Error("Child not found");
            }
            const child = await Child.create(childFields);
            return child;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteChild: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const childFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Child.update(childFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
