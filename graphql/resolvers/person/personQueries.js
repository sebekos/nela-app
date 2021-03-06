const { Person, sequelize } = require("../../../sequelize");
const { Op } = require("sequelize");

module.exports = {
    person: async (_, args) => {
        try {
            const returnData = await Person.findOne({
                where: { id: args.filter ? args.filter : { [Op.ne]: 0 }, deleted: 0 },
                order: [["createdAt", "DESC"]]
            });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    },
    people: async (_, args) => {
        try {
            const returnData = await Person.findAll({ order: [["updatedAt", "DESC"]], where: { deleted: 0 }, limit: 5 });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    },
    searchPeople: async (_, args) => {
        try {
            const { search } = args;
            const [results] = await sequelize.query(
                `
                SELECT
                id,
                first_name,
                middle_name,
                last_name,
                birth_date,
                birth_location,
                passed_date,
                passed_location,
                link_photo
                FROM main.people AS MP
                WHERE MP.first_name LIKE :search AND deleted = 0
                OR MP.middle_name LIKE :search AND deleted = 0
                OR MP.last_name LIKE :search AND deleted = 0
                ORDER BY last_name ASC
                LIMIT 30;
                `,
                {
                    replacements: { search: `%${search}%` }
                }
            );
            const returnStuff = {
                id: "searchresults",
                results: results
            };
            return returnStuff;
        } catch (err) {
            throw new Error(err);
        }
    },
    familySearchPeople: async (_, args) => {
        try {
            const { search } = args;
            const [results] = await sequelize.query(
                `
                SELECT
                id,
                first_name,
                middle_name,
                last_name,
                birth_date,
                birth_location,
                passed_date,
                passed_location,
                link_photo
                FROM main.people AS MP
                WHERE MP.first_name LIKE :search AND deleted = 0
                OR MP.middle_name LIKE :search AND deleted = 0
                OR MP.last_name LIKE :search AND deleted = 0
                ORDER BY updatedAt DESC
                LIMIT 30;
                `,
                {
                    replacements: { search: `%${search}%` }
                }
            );
            const returnStuff = {
                id: "familysearchresults",
                results: results
            };
            return returnStuff;
        } catch (err) {
            throw new Error(err);
        }
    },
    relations: async (_, args) => {
        const { filter } = args;
        if (isNaN(filter)) {
            throw new Error("Invalid search value");
        }
        try {
            const [results] = await sequelize.query(`
                SELECT
                MS.id AS tid,
                MP.id,
                'children' AS relation,
                NULL AS info_date,
                MP.first_name,
                MP.middle_name,
                MP.last_name,
                MP.link_photo,
                MP.birth_date,
                MP.passed_date
                FROM main.children AS MS
                LEFT JOIN main.people AS MP
                ON MS.child_key = MP.id
                WHERE person_key = ${filter}
                AND MS.deleted = 0
                AND MP.deleted = 0

                UNION ALL

                SELECT
                MS.id AS tid,
                MP.id,
                'parents' AS relation,
                NULL AS info_date,
                MP.first_name,
                MP.middle_name,
                MP.last_name,
                MP.link_photo,
                MP.birth_date,
                MP.passed_date
                FROM main.parents AS MS
                LEFT JOIN main.people AS MP
                ON MS.parent_key = MP.id
                WHERE person_key = ${filter}
                AND MS.deleted = 0
                AND MP.deleted = 0

                UNION ALL

                SELECT
                MS.id AS tid,
                MP.id,
                'siblings' AS relation,
                NULL AS info_date,
                MP.first_name,
                MP.middle_name,
                MP.last_name,
                MP.link_photo,
                MP.birth_date,
                MP.passed_date
                FROM main.siblings AS MS
                LEFT JOIN main.people AS MP
                ON MS.sibling_key = MP.id
                WHERE person_key = ${filter}
                AND MS.deleted = 0
                AND MP.deleted = 0

                UNION ALL

                SELECT
                MS.id AS tid,
                MP.id,
                'spouses' AS relation,
                MS.wed_date AS info_date,
                MP.first_name,
                MP.middle_name,
                MP.last_name,
                MP.link_photo,
                MP.birth_date,
                MP.passed_date
                FROM main.spouses AS MS
                LEFT JOIN main.people AS MP
                ON MS.spouse_key = MP.id
                WHERE person_key = ${filter}
                AND MS.deleted = 0
                AND MP.deleted = 0
                `);
            return results;
        } catch (err) {
            throw new Error(err);
        }
    },
    alphaSearch: async (_, args) => {
        try {
            const [results] = await sequelize.query(
                `
                SELECT 
                substr(last_name,1,1) AS alpha, 
                count(1) AS num
                FROM main.people
                WHERE deleted = 0
                GROUP BY substr(last_name,1,1)
                ORDER BY alpha ASC;
                `
            );
            return results;
        } catch (err) {
            throw new Error(err);
        }
    },
    alphaList: async (_, args) => {
        const { filter } = args;
        if (filter.length !== 1) {
            throw new Error("Invalid search value");
        }
        try {
            const [results] = await sequelize.query(
                `
                SELECT 
                id,
                first_name,
                middle_name,
                last_name,
                birth_date,
                birth_location,
                passed_date,
                passed_location,
                link_photo
                FROM main.people
                WHERE last_name LIKE '${args.filter}%'
                AND deleted = 0
                ORDER BY last_name
                `
            );
            const returnStuff = {
                id: "alphalistresults",
                results: results
            };
            return returnStuff;
        } catch (err) {
            throw new Error(err);
        }
    }
};
