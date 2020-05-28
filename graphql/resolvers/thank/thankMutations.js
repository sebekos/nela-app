const { Thank } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addThank: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { text } = args.thankInput;
        const thankFields = {
            text,
            deleted: 0,
            createdUser: context.userId,
            lastUser: context.userId
        };
        try {
            const thank = await Thank.create(thankFields);
            return thank;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateThank: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, text } = args.updateThankInput;
        const thankFields = {
            text,
            lastUser: context.userId
        };
        try {
            let thank = await Thank.update(thankFields, { where: { id } });
            thank = await Thank.findOne({ where: { id } });
            return thank;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteThank: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const thankFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Thank.update(thankFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
