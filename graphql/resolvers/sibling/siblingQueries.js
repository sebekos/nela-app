const { sequelize } = require("../../../sequelize");

module.exports = {
    siblings: async (_, args) => {
        try {
            const [results] = await sequelize.query(`
                SELECT
                id,
                first_name,
                middle_name,
                last_name,
                birth_date,
                passed_date
                FROM main.people
                WHERE id IN (
                    SELECT
                    sibling_key
                    FROM main.siblings
                    WHERE person_key = ${args.filter}
                    AND deleted = 0
                )
                AND deleted = 0
            `);
            return results;
        } catch (err) {
            throw new Error(err);
        }
    }
};
