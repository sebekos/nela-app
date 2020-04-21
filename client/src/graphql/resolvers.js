const resolvers = {
    Mutation: {
        updateAuth: (_, args, { cache }) => {
            console.log("inside update");
            cache.writeData({
                data: {
                    auth: {
                        isAuthenticated: true,
                        userId: args.userId,
                        token: args.token,
                        tokenExpiration: args.tokenExpiration,
                        __typename: "Auth"
                    }
                }
            });
        }
    }
};

export default resolvers;
