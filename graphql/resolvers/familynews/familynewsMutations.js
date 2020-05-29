const { FamilyNews } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addFamilyNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { text, type } = args.familyNewsInput;
        const { userId } = context;
        const familyNewsFields = {
            type,
            text,
            deleted: 0,
            createdUser: userId,
            lastUser: userId
        };
        try {
            const familynews = await FamilyNews.create(familyNewsFields);
            return familynews;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateFamilyNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, text, type } = args.updateFamilyNewsInput;
        const { userId } = context;
        const familyNewsFields = {
            text,
            type,
            lastUser: userId
        };
        try {
            let familynews = await FamilyNews.update(familyNewsFields, { where: { id } });
            familynews = await FamilyNews.findOne({ where: { id } });
            return familynews;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteFamilyNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const { userId } = context;
        const familyNewsFields = {
            deleted: 1,
            lastUser: userId
        };
        try {
            await FamilyNews.update(familyNewsFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
