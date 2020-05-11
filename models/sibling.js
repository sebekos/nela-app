module.exports = (sequelize, type) => {
    return sequelize.define("sibling", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_key: {
            type: type.INTEGER,
            allowNull: false
        },
        sibling_key: {
            type: type.INTEGER,
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
