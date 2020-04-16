import React from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Tree from "./Tree";
import History from "./History";

const Container = styled.div``;

const MainPage = () => {
    return (
        <Container>
            <Intro />
            <Tree />
            <History />
        </Container>
    );
};

export default MainPage;
