import jwt from "jwt-decode";
import gql from "graphql-tag";

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
            const data = cache.readQuery({
                query: LOCAL_SEARCH_DATA,
                variables: {
                    search: "kos"
                }
            });
            return data;
        }
    }
};

const LOCAL_SEARCH_DATA = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
                first_name
                middle_name
                last_name
                birth_date
                passed_date
            }
        }
    }
`;

export default resolvers;
