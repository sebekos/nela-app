module.exports = (sequelize, type) => {
    return sequelize.define("wedding", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        spouseId: {
            type: type.INTEGER,
            allowNull: false
        },
        wedDate: {
            type: type.DATE,
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
