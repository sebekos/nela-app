import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab } from "@material-ui/core";

const Container = styled.div`
    margin: -3rem auto 0;
    padding: 0rem 0 0;
    max-width: 1300px;
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

const GeneralNews2 = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <MainTitle>Newsy</MainTitle>
            <Paper>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Newsy" />
                    <Tab label="Wydarzyło się" />
                    <Tab label="Zabraklo miedzy nami" />
                    <Tab label="Witamy w rodzinie" />
                    <Tab label="Podziękowania" />
                    <Tab label="Zjazdy" />
                </Tabs>
            </Paper>
            <Container></Container>
        </>
    );
};

export default GeneralNews2;
