const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addParent: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, parent_key } = args.parentInput;
        const { userId } = context;
        try {
            // Check if same connection
            if (person_key === parent_key) {
                throw new Error("You can't add yourself...");
            }
            // Check if connection exists
            const relationCheck = await sequelize.query(`
                SELECT id FROM main.children WHERE person_key = ${person_key} AND child_key = ${parent_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.spouses WHERE person_key = ${person_key} AND spouse_key = ${parent_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.parents WHERE person_key = ${person_key} AND parent_key = ${parent_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.siblings WHERE person_key = ${person_key} AND sibling_key = ${parent_key} AND deleted = 0
            `);
            if (relationCheck[0].length > 0) {
                throw new Error("Relation already exists");
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
                (${person_key}, ${parent_key}, 0, \"${userId}\", \"${userId}\", CURRENT_DATE(), CURRENT_DATE());
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
        const { userId } = context;
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
