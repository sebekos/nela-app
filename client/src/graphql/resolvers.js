const resolvers = {
    Login: {
        login: (_, args, { cache }) => {
            console.log("inside login resolver");
            return null;
        }
    },
    Query: {
        login: (_, args, { cache }) => {
            console.log("inside login resolver");
            return null;
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
        },
        login: (_, args, { cache }) => {
            console.log("inside login resolver");
            return null;
        }
    },
    AuthData: {
        isInCart: (auth, _, { cache }) => {
            console.log("inside isCart resolver");
            return false;
        },
        login: (_, args, { cache }) => {
            console.log("inside login resolver");
            return null;
        }
    }
};

export default resolvers;
