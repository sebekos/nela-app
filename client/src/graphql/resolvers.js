const resolvers = {
    Query: {
        numberSix() {
            return 6;
        },
        numberSeven() {
            return 7;
        }
    },
    Mutation: {
        updateAuth: (_, args, { cache }) => {
            console.log("inside update");
            cache.writeData({
                data: {
                    auth: {
                        isAuth: true,
                        userId: args.userId,
                        token: args.token,
                        tokenExpiration: args.tokenExpiration,
                        __typename: "Auth"
                    }
                }
            });
            return null;
        }
    }
};

export default resolvers;
