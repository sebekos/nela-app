import React from "react";
import styled from "styled-components";
import PrimaryButton from "../universal/PrimaryButton";
import { Link } from "react-router-dom";

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

const ButtonsContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const NewsyButton = styled(PrimaryButton)`
    margin-right: 0.25rem;
`;

const Buttons = () => {
    return (
        <ButtonsContainer>
            <Link to="newsaddedit">
                <NewsyButton>Newsy</NewsyButton>
            </Link>
        </ButtonsContainer>
    );
};

const Dashboard = () => {
    return (
        <Container>
            <MainTitle>Dashboard</MainTitle>
            <Buttons />
        </Container>
    );
};

export default Dashboard;
