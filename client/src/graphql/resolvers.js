const resolvers = {
    Query: {
        logout: (_root, variables, { cache, getCacheKey }) => {
            console.log("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            const id = getCacheKey({ _id: 12345 });
            const data = {
                isAuth: false,
                userId: null,
                token: null,
                tokenExpiration: null
            };
            cache.writeData({ id, data });
            return null;
        }
    }
};

export default resolvers;
