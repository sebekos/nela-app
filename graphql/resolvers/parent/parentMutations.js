const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, parent_key } = args.parentInput;
        try {
            const checkParent = await Person.findOne({ where: { id: parent_key } });
            if (!checkParent) {
                throw new Error("Parent not found");
            }
            await sequelize.query(`
                INSERT INTO main.parents (
                    person_key,
                    parent_key,
                    deleted,
                    createdUser,
                    lastUser,
                    createdAt,
                    updatedAt
                )
                VALUES
                (${person_key}, ${parent_key}, 0, \"${context.userId}\", \"${context.userId}\", CURRENT_DATE(), CURRENT_DATE());
            `);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        try {
            await sequelize.query(`
                WITH RELATE (id) AS (
                    SELECT id FROM main.parents WHERE id = ${id}
                    UNION ALL
                    SELECT id FROM main.parents WHERE person_key IN(
                        SELECT parent_key FROM main.parents WHERE id = ${id}
                    )
                    AND parent_key IN (
                        SELECT person_key FROM main.parents WHERE id = ${id}
                    )
                    AND deleted = 0
                )
                UPDATE main.parents SET
                deleted = 1,
                lastUser = \"${context.userId}\",
                updatedAt = CURRENT_DATE()
                WHERE id IN(SELECT id FROM RELATE);
            `);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
