import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-client";
import resolvers from "./graphql/resolvers";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { ErrorLink } from "apollo-link-error";
import { ToastContainer } from "react-toastify";
import { errorHandler } from "./utils/errors";
import "react-toastify/dist/ReactToastify.min.css";

const cache = new InMemoryCache({});
const uploadLink = createUploadLink({
    uri: "/graphql",
    headers: {
        "x-auth-token": localStorage.getItem("token")
    },
    fetchOptions: {
        onProgress: (progress) => {
            console.log(progress);
        }
    }
});

const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
    errorHandler(graphQLErrors, networkError);
});

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache,
    resolvers
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
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ToastContainer hideProgressBar pauseOnHover={false} />
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
