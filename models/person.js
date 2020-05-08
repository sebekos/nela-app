module.exports = (sequelize, type) => {
    return sequelize.define("person", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING
        },
        middle_name: {
            type: type.STRING
        },
        last_name: {
            type: type.STRING,
            allowNull: false
        },
        birth_date: {
            type: type.DATEONLY
        },
        passed_date: {
            type: type.DATEONLY
        },
        link_photo: {
            type: type.STRING
        },
        notes: {
            type: type.TEXT
        },
        deleted: {
            type: type.INTEGER,
            defaultValue: 0
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
