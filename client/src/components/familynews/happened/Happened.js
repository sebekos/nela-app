import React from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const MainTitle = styled.div`
    font-size: 1.5rem;
`;

const Happened = () => {
    return (
        <Container>
            <MainTitle>Wydarzyło się</MainTitle>
            <p>Happened</p>
        </Container>
    );
};

export default Happened;
