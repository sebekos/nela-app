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
import History from "./components/history/History";
import General from "./components/general/General";
import Gallery from "./components/gallery/Gallery";
import FamilyNews from "./components/familynews/FamilyNews";
import Family from "./components/family/Family";
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
                <Route exact path="/rodzina" component={Family} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/kontakt" component={Contact} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/historia" component={History} />
                <Route exact path="/zjazdy" component={General} />
                <Route exact path="/galeria" component={Gallery} />
                <Route exact path="/wiesci" component={FamilyNews} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
