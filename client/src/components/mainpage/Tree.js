import React from "react";
import styled from "styled-components";
import TreeJpg from "../../img/tree.jpg";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    background-color: #f0f0f0;
`;

const ImgContainer = styled.div`
    max-width: 650px;
    justify-self: end;
    padding: 3rem;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const TreeImage = () => {
    return (
        <ImgContainer>
            <Img src={TreeJpg} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    text-align: center;
    max-width: 650px;
    padding: 3rem;
`;

const TextTitle = styled.div`
    font-size: 2rem;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <TextTitle>Family Tree</TextTitle>
            <TextDesc>Text Description</TextDesc>
        </TextContainer>
    );
};

const Tree = () => {
    return (
        <Container>
            <TreeImage />
            <Text />
        </Container>
    );
};

export default Tree;
