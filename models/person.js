module.exports = (sequelize, type) => {
    return sequelize.define("person", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING,
            validate: {
                len: [0, 24]
            }
        },
        middle_name: {
            type: type.STRING,
            validate: {
                len: [0, 24]
            }
        },
        last_name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
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
            type: type.TEXT,
            validate: {
                len: [0, 300]
            }
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
