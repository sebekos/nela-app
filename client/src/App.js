import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/layout/Footer";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const cache = new InMemoryCache({});

const client = new ApolloClient({
    cache,
    resolvers: {
        Mutation: {
            updateAuth: (_, args, { cache }) => {
                console.log("inside update");
                console.log(args);
                cache.writeData({
                    auth: {
                        isAuthenticated: true,
                        userId: args.userId,
                        token: args.token,
                        tokenExpiration: args.tokenExpiration,
                        __typename: "Auth"
                    }
                });
            }
        }
    }
});

cache.writeData({
    data: {
        auth: {
            isAuthenticated: false,
            userId: null,
            token: null,
            __typename: "Auth"
        }
    }
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navbar />
                <ToastContainer hideProgressBar pauseOnHover={false} />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/newsy" component={News} />
                    <Route exact path="/kontakt" component={Contact} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Footer />
            </Router>
        </ApolloProvider>
    );
};

export default App;
