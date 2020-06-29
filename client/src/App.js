import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/layout/Footer";
import Contact from "./components/contact/Contact";
import History from "./components/history/History";
import Gallery from "./components/gallery/Gallery";
import Family from "./components/family/Family";
import AddPhotos from "./components/addphotos/AddPhotos";
import GalleryView from "./components/galleryview/GalleryView";
import ScrollToTop from "./utils/scrollToTop";
import Tree2 from "./components/family/trees/tree2/Tree2";
import GeneralNews from "./components/generalnews/GeneralNews";
import DeletePhotos from "./components/deletephotos/DeletePhotos";

import "./App.css";

const App = () => {
    useQuery(LOAD_USER_QUERY);
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/rodzina" component={Family} />
                <Route exact path="/rodzina/:id" component={Tree2} />
                <Route exact path="/newsy" component={GeneralNews} />
                <Route exact path="/kontakt" component={Contact} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/historia" component={History} />
                <Route exact path="/galeria" component={Gallery} />
                <Route exact path="/galeria/:id" component={GalleryView} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/addphotos/:id" component={AddPhotos} />
                <PrivateRoute exact path="/deletephotos/:id" component={DeletePhotos} />
            </Switch>
            <Footer />
        </Router>
    );
};

const LOAD_USER_QUERY = gql`
    {
        loaduser @client
    }
`;

export default App;
