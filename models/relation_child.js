module.exports = (sequelize, type) => {
    return sequelize.define("relation_child", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_key: {
            type: type.INTEGER,
            allowNull: false
        },
        child_key: {
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
