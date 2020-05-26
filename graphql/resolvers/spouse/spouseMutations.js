const { Spouse, Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, spouse_key } = args.spouseInput;
        try {
            const checkSpouse = await Person.findOne({ where: { id: spouse_key } });
            if (!checkSpouse) {
                throw new Error("Spouse not found");
            }
            await sequelize.query(`
                SET @today=CAST(CURRENT_DATE() AS CHAR(50));
                INSERT INTO main.spouses (
                    person_key,
                    spouse_key,
                    deleted,
                    createdUser,
                    lastUser,
                    createdAt,
                    updatedAt
                )
                VALUES
                (${person_key}, ${spouse_key}, 0, \"${context.userId}\", \"${context.userId}\", @today, @today),
                (${spouse_key}, ${person_key}, 0, \"${context.userId}\", \"${context.userId}\", @today, @today)
            `);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const spouseFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Spouse.update(spouseFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
