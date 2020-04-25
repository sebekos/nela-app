import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import resolvers from "./graphql/resolvers";

const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => {
        return id;
    }
});

const client = new ApolloClient({
    cache,
    resolvers,
    request: (operation) => {
        const token = localStorage.getItem("token");
        operation.setContext({
            headers: {
                "x-auth-token": token ? token : ""
            }
        });
    }
});

cache.writeData({
    data: {
        auth: {
            id: "auth",
            isAuth: false,
            userId: null,
            token: null,
            tokenExpiration: null,
            __typename: "auth"
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
