module.exports = (sequelize, type) => {
    return sequelize.define("familynews", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: type.INTEGER,
            allowNull: false
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
