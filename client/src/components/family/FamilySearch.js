import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab } from "@material-ui/core";
import NameSearch from "./NameSearch";
import AlphaSearch from "./AlphaSearch";

const Container = styled.div`
    margin: auto;
    padding: 0rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 4rem 0 0rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const FamilySearch = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
            <Paper>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab style={{ textTransform: "capitalize" }} label="Search" />
                    <Tab style={{ textTransform: "capitalize" }} label="List" />
                </Tabs>
            </Paper>
            <NameSearch value={value} index={0} />
            <AlphaSearch value={value} index={1} />
        </Container>
    );
};

export default FamilySearch;
