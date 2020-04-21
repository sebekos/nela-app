import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import resolvers from "./graphql/resolvers";

const cache = new InMemoryCache({});

const client = new ApolloClient({
    cache,
    resolvers,
    clientState: {
        defaults: {
            auth: {
                isAuth: false,
                userId: null,
                token: null,
                tokenExpiration: null,
                __typename: "UserAuth"
            }
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
