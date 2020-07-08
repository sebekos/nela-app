import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab } from "@material-ui/core";
import NewsAddEdit from "../news-add-edit/NewsAddEdit";
import FamilyNewsAddEdit from "../familynews-add-edit/FamilyNewsAddEdit";
import ThanksAddEdit from "../thanks-add-edit/ThanksAddEdit";
import ReunionAddEdit from "../reunion-add-edit/ReunionAddEdit";
import GaleriaAddEdit from "../gallery-add-edit/GalleryAddEdit";
import PersonAddEdit from "../person-add-edit/PersonAddEdit";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const Dashboard = () => {
    const [page, setPage] = useState(0);

    useQuery(LOCAL_DASHBOARD_QUERY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            console.log(data.searchDashboard);
            setPage(data.searchDashboard);
        }
    });

    const [setDashPage] = useLazyQuery(SET_DASHBOARD_TAB);

    const handleChange = (event, newValue) => {
        setDashPage({
            variables: {
                page: newValue
            }
        });
        setPage(newValue);
    };

    return (
        <Container>
            <Paper>
                <Tabs value={page} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab style={{ textTransform: "capitalize" }} label="Info" />
                    <Tab style={{ textTransform: "capitalize" }} label="Newsy" />
                    <Tab style={{ textTransform: "capitalize" }} label="Wydarzyło się" />
                    <Tab style={{ textTransform: "capitalize" }} label="Podziękowania" />
                    <Tab style={{ textTransform: "capitalize" }} label="Zjazdy" />
                    <Tab style={{ textTransform: "capitalize" }} label="Galeria" />
                    <Tab style={{ textTransform: "capitalize" }} label="Rodzina" />
                </Tabs>
            </Paper>
            <NewsAddEdit value={page} index={1} />
            <FamilyNewsAddEdit value={page} index={2} />
            <ThanksAddEdit value={page} index={3} />
            <ReunionAddEdit value={page} index={4} />
            <GaleriaAddEdit value={page} index={5} />
            <PersonAddEdit value={page} index={6} />
        </Container>
    );
};

const LOCAL_DASHBOARD_QUERY = gql`
    {
        searchDashboard @client
    }
`;

const SET_DASHBOARD_TAB = gql`
    query SetDashboard($page: Int!) {
        set_dashboard_tab(page: $page) @client
    }
`;

export default Dashboard;
