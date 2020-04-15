import React from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Tree from "./Tree";

const Container = styled.div``;

const MainPage = () => {
    return (
        <Container>
            <Intro />
            <Tree />
        </Container>
    );
};

export default MainPage;
