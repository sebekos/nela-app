import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/layout/Footer";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import History from "./components/history/History";
import Reunion from "./components/reunion/Reunion";
import Gallery from "./components/gallery/Gallery";
import FamilyNews from "./components/familynews/FamilyNews";
import Family from "./components/family/Family";
import NewsAddEdit from "./components/news-add-edit/NewsAddEdit";
import ReunionAddEdit from "./components/reunion-add-edit/ReunionAddEdit";
import FamilyNewsAddEdit from "./components/familynews-add-edit/FamilyNewsAddEdit";
import GalleryAddEdit from "./components/gallery-add-edit/GalleryAddEdit";
import AddPhotos from "./components/addphotos/AddPhotos";
import "./App.css";

const App = () => {
    useQuery(LOAD_USER_QUERY);
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/rodzina" component={Family} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/kontakt" component={Contact} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/newsy" component={News} />
                <Route exact path="/historia" component={History} />
                <Route exact path="/zjazdy" component={Reunion} />
                <Route exact path="/galeria" component={Gallery} />
                <Route exact path="/wiesci" component={FamilyNews} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/newsaddedit" component={NewsAddEdit} />
                <PrivateRoute exact path="/reunionaddedit" component={ReunionAddEdit} />
                <PrivateRoute exact path="/familynewsaddedit" component={FamilyNewsAddEdit} />
                <PrivateRoute exact path="/galleryaddedit" component={GalleryAddEdit} />
                <PrivateRoute exact path="/addphotos/:id" component={AddPhotos} />
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
