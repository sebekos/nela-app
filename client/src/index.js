import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
// import resolvers from "./graphql/resolvers";
// import typeDefs from "./graphql/typeDefs";

const cache = new InMemoryCache({
    dataIdFromObject: ({ _id }) => {
        return _id;
    }
});

const client = new ApolloClient({
    cache,
    resolvers: {}
});

cache.writeData({
    data: {
        auth: {
            _id: 12345,
            isAuth: false,
            userId: null,
            token: null,
            tokenExpiration: null
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
