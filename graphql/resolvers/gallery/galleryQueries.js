const { Gallery, Photo, sequelize } = require("../../../sequelize");

module.exports = {
    ui_galleries: async () => {
        try {
            const [results] = await sequelize.query(`
                SELECT
                MG.id,
                MG.title,
                MG.text,
                MG.createdAt,
                (SELECT link_thumb FROM main.photos AS MP WHERE MP.key = MG.id LIMIT 1) AS thumb_1
                FROM main.galleries AS MG
                WHERE id IN(
                    SELECT DISTINCT MP.key FROM main.photos AS MP
                )
                ORDER BY createdAt DESC
                LIMIT 9;
            `);
            const returnStuff = {
                id: "galleries",
                galleries: results
            };
            return returnStuff;
        } catch (error) {
            throw new Error(err);
        }
    },
    galleries: async () => {
        try {
            const [results] = await sequelize.query(`
                SELECT
                MG.id,
                MG.title,
                MG.text,
                MG.createdAt,
                (SELECT link_thumb FROM main.photos AS MP WHERE MP.key = MG.id LIMIT 1) AS thumb_1
                FROM main.galleries AS MG
                WHERE deleted = 0
                ORDER BY createdAt DESC;
            `);
            const returnStuff = {
                id: "galleries",
                galleries: results
            };
            return returnStuff;
        } catch (error) {
            throw new Error(err);
        }
    },
    gallery: async (_, args) => {
        const id = args.filter;
        try {
            const returnData = await Gallery.findOne({ where: { id } });
            const photosData = await Photo.findAll({ where: { key: id } });
            returnData["photos"] = photosData;
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    },
    photos: async (_, args) => {
        const id = args.filter;
        try {
            const returnData = await Photo.findAll({ where: { key: id } });
            return returnData;
        } catch (error) {
            throw new Error(err);
        }
    }
};
