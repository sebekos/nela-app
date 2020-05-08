const { Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

const personInputs = [
    "first_name",
    "middle_name",
    "last_name",
    "birth_date",
    "passed_date",
    "link_photo",
    "notes",
    "createdUser",
    "lastUser"
];

module.exports = {
    addPerson: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }

        const personFields = personInputs.reduce((memo, val) => {
            if (args.personInputs[val]) memo[val] = myinputs[val];
            return memo;
        }, {});
        personFields.lastUser = context.userId;
        personFields.createdUser = context.userId;

        try {
            const person = await Person.create(personFields);
            return person;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    },
    updatePerson: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }

        const personFields = personInputs.reduce((memo, val) => {
            if (args.personInputs[val]) memo[val] = myinputs[val];
            return memo;
        }, {});
        personFields.lastUser = context.userId;

        try {
            const person = await Person.update(personFields);
            return person;
        } catch (err) {
            console.log(err);
            throw new Error("Server Error");
        }
    }
};
