const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSibling: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, sibling_key } = args.siblingInput;
        const { userId } = context;
        try {
            // Check if same connection
            if (person_key === sibling_key) {
                throw new Error("You can't add yourself...");
            }
            // Check if connection exists
            const relationCheck = await sequelize.query(`
                SELECT id FROM main.children WHERE person_key = ${person_key} AND child_key = ${sibling_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.spouses WHERE person_key = ${person_key} AND spouse_key = ${sibling_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.parents WHERE person_key = ${person_key} AND parent_key = ${sibling_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.siblings WHERE person_key = ${person_key} AND sibling_key = ${sibling_key} AND deleted = 0
            `);
            if (relationCheck[0].length > 0) {
                throw new Error("Relation already exists");
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
                (${person_key}, ${sibling_key}, 0, \"${userId}\", \"${userId}\", CURRENT_DATE(), CURRENT_DATE())
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
        const { userId } = context;
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
