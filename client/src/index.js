import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import resolvers from "./graphql/resolvers";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache({});

const link = createUploadLink({ uri: "/graphql" });

const client = new ApolloClient({
    link,
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
            __typename: "AuthData"
        },
        news: {
            id: "news",
            __typename: "NewsData"
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
