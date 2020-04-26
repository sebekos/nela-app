import React from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const MainTitle = styled.div`
    font-size: 1.5rem;
`;

const Later = () => {
    return (
        <Container>
            <MainTitle>Zabraklo miedzy nami</MainTitle>
            <p>Later</p>
        </Container>
    );
};

export default Later;
