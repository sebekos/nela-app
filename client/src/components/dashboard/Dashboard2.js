import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab, CircularProgress } from "@material-ui/core";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const Dashboard = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <MainTitle>Dashboard</MainTitle>
            <Paper>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab style={{ textTransform: "capitalize" }} label="Newsy" />
                    <Tab style={{ textTransform: "capitalize" }} label="Wydarzyło się" />
                    <Tab style={{ textTransform: "capitalize" }} label="Zabraklo miedzy nami" />
                    <Tab style={{ textTransform: "capitalize" }} label="Witamy w rodzinie" />
                    <Tab style={{ textTransform: "capitalize" }} label="Podziękowania" />
                    <Tab style={{ textTransform: "capitalize" }} label="Zjazdy" />
                </Tabs>
            </Paper>
        </Container>
    );
};

export default Dashboard;
