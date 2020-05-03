const { Reunion } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server");

module.exports = {
    addReunion: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { title, text } = args.reunionInput;
        const reunionFields = {
            title,
            text,
            deleted: 0,
            createdUser: context.userId,
            lastUser: context.userId
        };
        try {
            const reunion = await Reunion.create(reunionFields);
            return reunion.dataValues;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    },
    updateReunion: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { id, title, text } = args.reunionNewsInput;
        const reunionFields = {
            title,
            text,
            lastUser: context.userId
        };
        try {
            let reunion = await Reunion.update(reunionFields, { where: { id } });
            reunion = await Reunion.findOne({ where: { id } });
            return reunion.dataValues;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    }
};
