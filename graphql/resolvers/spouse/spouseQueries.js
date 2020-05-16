const { sequelize } = require("../../../sequelize");

module.exports = {
    spouses: async (_, args) => {
        try {
            const [results] = await sequelize.query(`
                SELECT
                id,
                first_name,
                middle_name,
                last_name,
                link_photo,
                birth_date,
                passed_date
                FROM main.people
                WHERE id IN (
                    SELECT
                    spouse_key
                    FROM main.spouses
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
