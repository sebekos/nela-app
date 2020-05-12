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
            const returnData = await Person.findAll({ order: [["updatedAt", "DESC"]], where: { deleted: 0 } });
            const returnStuff = {
                id: "people",
                people: returnData
            };
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
                passed_date
                FROM main.people AS MP
                WHERE MP.first_name LIKE :search AND deleted = 0
                OR MP.middle_name LIKE :search AND deleted = 0
                OR MP.last_name LIKE :search AND deleted = 0
                ORDER BY MP.first_name ASC;
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
    }
};
