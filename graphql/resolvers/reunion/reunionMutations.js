const { Reunion } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addReunion: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { title, text } = args.reunionInput;
        const { userId } = context;
        const reunionFields = {
            title,
            text,
            deleted: 0,
            createdUser: userId,
            lastUser: userId
        };
        try {
            const reunion = await Reunion.create(reunionFields);
            return reunion;
        } catch (err) {
            throw new Error(err);
        }
    },
    updateReunion: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, title, text } = args.updateReunionInput;
        const { userId } = context;
        const reunionFields = {
            title,
            text,
            lastUser: userId
        };
        try {
            let reunion = await Reunion.update(reunionFields, { where: { id } });
            reunion = await Reunion.findOne({ where: { id } });
            return reunion;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteReunion: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id } = args;
        const { userId } = context;
        const reunionFields = {
            deleted: 1,
            lastUser: userId
        };
        try {
            await Reunion.update(reunionFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
