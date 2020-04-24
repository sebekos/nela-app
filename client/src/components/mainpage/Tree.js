import React from "react";
import styled from "styled-components";
import TreePng from "../../img/tree.png";
import PrimaryButton from "../universal/PrimaryButton";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    background-color: #f0f0f0;
    align-items: center;
`;

const ImgContainer = styled.div`
    max-width: 650px;
    justify-self: end;
    padding: 5rem 1rem;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = () => {
    return (
        <ImgContainer>
            <Img src={TreePng} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    text-align: center;
    max-width: 650px;
    padding: 5rem 3rem;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const FamilyButton = styled(PrimaryButton)`
    padding: 0.5rem 2rem;
    margin: 2rem;
    font-size: 1rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <TextTitle>Nasza Rodzina</TextTitle>
            <TextDesc>AKTUALNIE WPROWADZAMY DANE</TextDesc>
            <TextDesc>Ale istnieje juz możliwośc przegladania efektow naszej pracy :)</TextDesc>
            <Link to="Rodzina">
                <FamilyButton>Rodzina</FamilyButton>
            </Link>
        </TextContainer>
    );
};

const Tree = () => {
    return (
        <Container>
            <Image />
            <Text />
        </Container>
    );
};

export default Tree;
