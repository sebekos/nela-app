import React from "react";
import styled from "styled-components";
import Happened from "./happened/Happened";
import Hello from "./hello/Hello";
import Later from "./later/Later";

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

const NewsGroupsContainer = styled.div`
    margin: auto;
`;

const FamilyNews = () => {
    return (
        <Container>
            <MainTitle>Wiesci Rodzinne</MainTitle>
            <NewsGroupsContainer>
                <Happened />
                <Hello />
                <Later />
            </NewsGroupsContainer>
        </Container>
    );
};

export default FamilyNews;
