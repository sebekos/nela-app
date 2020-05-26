const { Parent, sequelize } = require("../../../sequelize");

module.exports = {
    parents: async (_, args) => {
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
                FROM main.parents AS MS
                LEFT JOIN main.people AS MP
                ON MS.parent_key = MP.id
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
