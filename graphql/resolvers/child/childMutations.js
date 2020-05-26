const { Person, sequelize } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    addChild: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const { person_key, child_key } = args.childInput;
        try {
            const checkChild = await Person.findOne({ where: { id: child_key } });
            if (!checkChild) {
                throw new Error("Child not found");
            }
            await sequelize.query(`
                INSERT INTO main.children (
                    person_key,
                    child_key,
                    deleted,
                    createdUser,
                    lastUser,
                    createdAt,
                    updatedAt
                )
                VALUES
                (${person_key}, ${child_key}, 0, \"${context.userId}\", \"${context.userId}\", CURRENT_DATE(), CURRENT_DATE());
            `);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteChild: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        try {
            await sequelize.query(`
                WITH RELATE (id) AS (
                    SELECT id FROM main.children WHERE id = ${id}
                    UNION ALL
                    SELECT id FROM main.children WHERE person_key IN(
                        SELECT child_key FROM main.children WHERE id = ${id}
                    )
                    AND child_key IN (
                        SELECT person_key FROM main.children WHERE id = ${id}
                    )
                    AND deleted = 0
                )
                UPDATE main.children SET
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
