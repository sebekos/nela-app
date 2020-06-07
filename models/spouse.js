module.exports = (sequelize, type) => {
    return sequelize.define("spouse", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_key: {
            type: type.INTEGER,
            allowNull: false
        },
        spouse_key: {
            type: type.INTEGER,
            allowNull: false
        },
        wed_date: {
            type: type.DATEONLY
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
