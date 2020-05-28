const { Person } = require("../../../sequelize");
const { AuthenticationError } = require("apollo-server-express");

const personKeys = [
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
        const userInputs = args.personInput;
        const personFields = personKeys.reduce((memo, val) => {
            if (userInputs[val]) memo[val] = userInputs[val];
            return memo;
        }, {});
        personFields.lastUser = context.userId;
        personFields.createdUser = context.userId;
        try {
            const person = await Person.create(personFields);
            return person;
        } catch (err) {
            throw new Error(err);
        }
    },
    updatePerson: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const userInputs = args.updatePersonInput;
        const personFields = personKeys.reduce((memo, val) => {
            if (userInputs[val] !== null && userInputs[val] !== "") memo[val] = userInputs[val];
            return memo;
        }, {});
        personFields.lastUser = context.userId;
        try {
            await Person.update(personFields, { where: { id: userInputs.id } });
            const retPerson = await Person.findOne({ where: { id: userInputs.id } });
            return retPerson;
        } catch (err) {
            throw new Error(err);
        }
    },
    deletePerson: async (obj, args, context, info) => {
        if (!context.isAuth) {
            throw new AuthenticationError("Unauthenticated!");
        }
        const id = args.id;
        const personFields = {
            deleted: 1,
            lastUser: context.userId
        };
        try {
            await Person.update(personFields, { where: { id } });
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
};
