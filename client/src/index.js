import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const cache = new InMemoryCache({});

const client = new ApolloClient({
    cache,
    resolvers,
    typeDefs
});

cache.writeData({
    data: {
        auth: {
            isAuth: false,
            userId: null,
            token: null,
            tokenExpiration: null,
            __typename: "UserAuth"
        },
        isLoggedIn: false
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
