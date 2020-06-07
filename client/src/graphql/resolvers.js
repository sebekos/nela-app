import jwt from "jwt-decode";
import axios from "axios";

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
                axios.defaults.headers.common["x-auth-token"] = token;
                const data = {
                    id: "auth",
                    isAuth: true,
                    userId: decoded.userId,
                    token: token,
                    tokenExpiration: decoded.exp,
                    __typename: "AuthData"
                };
                cache.writeData({ data: { auth: data } });
            }
            return true;
        },
        logout: (_root, variables, { cache, getCacheKey }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            axios.defaults.headers.common["x-auth-token"] = null;
            const data = {
                id: "auth",
                isAuth: false,
                userId: null,
                token: null,
                tokenExpiration: null,
                __typename: "AuthData"
            };
            cache.writeData({ data: { auth: data } });
            return true;
        },
        search: (_root, variables, { cache, getCacheKey }) => {
            let localData = cache.data.data["SearchResults:searchresults"];
            let cachedData = [];
            if (localData) {
                localData = localData.results.map((item) => item.id);
            }
            cachedData = localData.map((item) => {
                return cache.data.data[item];
            });
            return { id: "searchresults", results: cachedData };
        }
    },
    Mutation: {
        deletePerson: (_root, variables, { cache, getCacheKey }) => {
            return true;
        }
    }
};

export default resolvers;
