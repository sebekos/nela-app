import jwt from "jwt-decode";

const resolvers = {
    Query: {
        loaduser: (_root, variables, { cache, getCacheKey }) => {
            const token = localStorage.getItem("token");
            if (!token) {
                return null;
            }
            const decoded = jwt(token);
            const currTime = Math.floor(Date.now() / 1000);
            if (currTime >= decoded.exp) {
                return null;
            } else {
                const id = getCacheKey({ id: "auth" });
                const data = {
                    isAuth: true,
                    userId: decoded.userId,
                    token: token,
                    tokenExpiration: decoded.exp
                };
                cache.writeData({ id, data });
            }
            return null;
        },
        logout: (_root, variables, { cache, getCacheKey }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            const id = getCacheKey({ id: "auth" });
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
