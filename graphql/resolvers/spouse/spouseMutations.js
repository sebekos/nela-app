const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addSpouse: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, spouse_key, wed_date } = args.spouseInput;
        const { userId } = context;
        const curr_wed_date = wed_date === "" ? null : `\"${wed_date}\"`;
        try {
            // Check if same connection
            if (person_key === spouse_key) {
                throw new Error("You can't add yourself...");
            }
            // Check if connection exists
            const relationCheck = await sequelize.query(`
                SELECT id FROM main.children WHERE person_key = ${person_key} AND child_key = ${spouse_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.spouses WHERE person_key = ${person_key} AND spouse_key = ${spouse_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.parents WHERE person_key = ${person_key} AND parent_key = ${spouse_key} AND deleted = 0
                UNION ALL
                SELECT id FROM main.siblings WHERE person_key = ${person_key} AND sibling_key = ${spouse_key} AND deleted = 0
            `);
            if (relationCheck[0].length > 0) {
                throw new Error("Relation already exists");
            }
            await sequelize.query(`
                INSERT INTO main.spouses (
                    person_key,
                    spouse_key,
                    wed_date,
                    deleted,
                    createdUser,
                    lastUser,
                    createdAt,
                    updatedAt
                )
                VALUES
                (${person_key}, ${spouse_key}, ${curr_wed_date}, 0, \"${userId}\", \"${userId}\", CURRENT_DATE(), CURRENT_DATE())
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
