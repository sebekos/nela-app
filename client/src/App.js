import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/auth";

import store from "./redux/store/store";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Navbar />
            <MainPage />
            <Router>
                <ToastContainer hideProgressBar pauseOnHover={false} />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
