module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: type.UUID,
            defaultValue: type.UUIDV1
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        lastlogindate: {
            type: type.DATE,
            defaultValue: new Date()
        }
    });
};
