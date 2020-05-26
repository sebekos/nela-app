const { sequelize } = require("../../../sequelize");

module.exports = {
    spouses: async (_, args) => {
        try {
            const [results] = await sequelize.query(`
                SELECT
                MS.id AS tid,
                MP.id,
                MP.first_name,
                MP.middle_name,
                MP.last_name,
                MP.link_photo,
                MP.birth_date,
                MP.passed_date
                FROM main.spouses AS MS
                LEFT JOIN main.people AS MP
                ON MS.spouse_key = MP.id
                WHERE person_key = ${args.filter}
                AND MS.deleted = 0
                AND MP.deleted = 0
            `);
            return results;
        } catch (err) {
            throw new Error(err);
        }
    }
};
