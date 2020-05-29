const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, spouse_key } = args.spouseInput;
        const { userId } = context;
        try {
            const checkSpouse = await Person.findOne({ where: { id: spouse_key } });
            if (!checkSpouse) {
                throw new Error("Spouse not found");
            }
            await sequelize.query(`
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
                (${person_key}, ${spouse_key}, 0, \"${userId}\", \"${userId}\", CURRENT_DATE(), CURRENT_DATE())
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
        const { userId } = context;
        try {
            await sequelize.query(`
                WITH RELATE (id) AS (
                    SELECT id FROM main.spouses WHERE id = ${id}
                    UNION ALL
                    SELECT id FROM main.spouses WHERE person_key IN(
                        SELECT spouse_key FROM main.spouses WHERE id = ${id}
                    )
                    AND spouse_key IN (
                        SELECT person_key FROM main.spouses WHERE id = ${id}
                    )
                    AND deleted = 0
                )
                UPDATE main.spouses SET
                deleted = 1,
                lastUser = \"${userId}\",
                updatedAt = CURRENT_DATE()
                WHERE id IN(SELECT id FROM RELATE);
            `);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
