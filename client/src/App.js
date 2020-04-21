import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/layout/Footer";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import Test from "./components/test/Test";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
    return (
        <Router>
            <Navbar />
            <ToastContainer hideProgressBar pauseOnHover={false} />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/kontakt" component={Contact} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/test" component={Test} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
