import React from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Tree from "./Tree";
import History from "./History";
import News from "./News";
import Gallery from "./Gallery";
import FamilyNews from "./FamilyNews";

const Container = styled.div``;

const MainPage = () => {
    return (
        <Container>
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
