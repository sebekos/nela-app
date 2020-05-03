const { FamilyNews } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server");

module.exports = {
    addFamilyNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { text, type } = args.familyNewsInput;
        const familyNewsFields = {
            type,
            text,
            deleted: 0,
            createdUser: context.userId,
            lastUser: context.userId
        };
        try {
            const familynews = await FamilyNews.create(familyNewsFields);
            return familynews.dataValues;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    },
    updateFamilyNews: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, text, type } = args.updateFamilyNewsInput;
        const familyNewsFields = {
            text,
            type,
            lastUser: context.userId
        };
        try {
            let familynews = await FamilyNews.update(familyNewsFields, { where: { id } });
            familynews = await FamilyNews.findOne({ where: { id } });
            return familynews.dataValues;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    }
};