module.exports = (sequelize, type) => {
    return sequelize.define("photo", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: type.INTEGER,
            allowNull: false
        },
        order: {
            type: type.INTEGER,
            allowNull: false
        },
        link_main: {
            type: type.STRING,
            allowNull: false
        },
        link_thumb: {
            type: type.STRING,
            allowNull: false
        },
        deleted: {
            type: type.INTEGER,
            allowNull: false
        },
        createdUser: {
            type: type.STRING,
            allowNull: false
        },
        lastUser: {
            type: type.STRING,
            allowNull: false
        }
    });
};
