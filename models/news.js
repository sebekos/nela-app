module.exports = (sequelize, type) => {
    return sequelize.define("news", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        text: {
            type: type.TEXT,
            allowNull: false,
            validate: {
                len: [1, 425]
            }
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
