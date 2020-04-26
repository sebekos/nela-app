module.exports = (sequelize, type) => {
    return sequelize.define("later", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
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
