import React from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Tree from "./Tree";
import History from "./History";
import News from "./News";
import Gallery from "./Gallery";
import FamilyNews from "./FamilyNews";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const MainPage = () => {
    return (
        <Container>
            <MainTitle>Strona Rodin Pytlewskich</MainTitle>
            <Intro />
            <Tree />
            <History />
            <News />
            <Gallery />
            <FamilyNews />
        </Container>
    );
};

export default MainPage;
