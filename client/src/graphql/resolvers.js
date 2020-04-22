const resolvers = {
    Query: {
        me: async (parent, args, { cache }, info) => {
            console.log("inside resolver");
            return {
                id: "123",
                email: "test@test.com",
                __typename: "me"
            };
        }
    }
};

export default resolvers;
