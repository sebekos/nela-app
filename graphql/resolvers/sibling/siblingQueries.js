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
                FROM main.siblings
                WHERE id IN (
                    SELECT
                    parent_key
                    FROM main.children
                    WHERE person_key = ${args.filter}
                    AND deleted = 0
                )
            `);
            return results;
        } catch (err) {
            throw new Error(err);
        }
    }
};
