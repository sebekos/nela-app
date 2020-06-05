const { Wedding } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addWedding: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { wedDate, spouseId } = args;
        const { userId } = context;
        const weddingFields = {
            wedDate,
            spouseId,
            deleted: 0,
            createdUser: userId,
            lastUser: userId
        };
        try {
            const wedding = await Wedding.create(weddingFields);
            return wedding;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateWedding: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, wedDate } = args;
        const { userId } = context;
        const weddingFields = {
            wedDate,
            lastUser: userId
        };
        try {
            let wedding = await Wedding.update(weddingFields, { where: { id } });
            wedding = await Wedding.findOne({ where: { id } });
            return wedding;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteWedding: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const { userId } = context;
        const weddingFields = {
            deleted: 1,
            lastUser: userId
        };
        try {
            await Wedding.update(weddingFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
