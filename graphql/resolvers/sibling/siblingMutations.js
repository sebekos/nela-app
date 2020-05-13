const { Sibling, Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSibling: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, sibling_key } = args.siblingInput;
        const siblingFields = {
            person_key,
            sibling_key,
            deleted: 0
        };
        siblingFields.lastUser = context.userId;
        siblingFields.createdUser = context.userId;
        try {
            const checkSibling = await Person.findOne({ where: { id: sibling_key } });
            if (!checkSibling) {
                throw new Error("Sibling not found");
            }
            const sibling = await Sibling.create(siblingFields);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteSibling: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const siblingFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Sibling.update(siblingFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
