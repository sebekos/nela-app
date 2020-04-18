import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import store from "./redux/store/store";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/layout/Footer";
import Contact from "./components/contact/Contact";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <ToastContainer hideProgressBar pauseOnHover={false} />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/kontakt" component={Contact} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Footer />
            </Router>
        </Provider>
    );
};

export default App;
