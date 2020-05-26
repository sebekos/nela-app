const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSibling: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, sibling_key } = args.siblingInput;
        try {
            const checkSibling = await Person.findOne({ where: { id: sibling_key } });
            if (!checkSibling) {
                throw new Error("Sibling not found");
            }
            await sequelize.query(`
                INSERT INTO main.siblings (
                    person_key,
                    sibling_key,
                    deleted,
                    createdUser,
                    lastUser,
                    createdAt,
                    updatedAt
                )
                VALUES
                (${person_key}, ${sibling_key}, 0, \"${context.userId}\", \"${context.userId}\", CURRENT_DATE(), CURRENT_DATE())
            `);
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
        try {
            await sequelize.query(`
                WITH RELATE (id) AS (
                    SELECT id FROM main.siblings WHERE id = ${id}
                    UNION ALL
                    SELECT id FROM main.siblings WHERE person_key IN(
                        SELECT sibling_key FROM main.siblings WHERE id = ${id}
                    )
                    AND sibling_key IN (
                        SELECT person_key FROM main.siblings WHERE id = ${id}
                    )
                    AND deleted = 0
                )
                UPDATE main.siblings SET
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
