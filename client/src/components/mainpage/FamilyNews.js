import React from "react";
import styled from "styled-components";
import CyclePng from "../../img/cycle.png";
import PrimaryButton from "../universal/PrimaryButton";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    background-color: white;
    align-items: center;
`;

const ImgContainer = styled.div`
    max-width: 650px;
    justify-self: start;
    padding: 5rem 3rem;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = () => {
    return (
        <ImgContainer>
            <Img src={CyclePng} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    justify-self: end;
    text-align: center;
    max-width: 650px;
    padding: 5rem 3rem;
`;

const TextDescBold = styled.div`
    font-size: 1rem;
    font-weight: bold;
`;

const TextDesc = styled.div`
    font-size: 1rem;
    padding: 0 0 1rem;
`;

const HistoryButton = styled(PrimaryButton)`
    padding: 0.5rem 2rem;
    margin: 1rem 0 0rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <TextDescBold>Wydarzyło się</TextDescBold>
            <TextDesc>
                Dnia 22 września 2018 r we Wrocławiu o godz.16.00 w kościele pod wezwaniem św.Henryka zawarli związek małżeński : Marta
                Klimas i Paweł Ciesiul. Życzymy wszystkiego najlepszego młodej parze
            </TextDesc>
            <TextDescBold>Witamy w rodzinie</TextDescBold>
            <TextDesc>
                Rodzicom Annie i Janowi Pytlewskim dnia 22 pażdziernika 2014 r we Wrocławiu urodziły się bliżniaki płci męskiej
                Maksymilian-Jakub i Aleksander Mikołaj. GRATULUJEMY.
            </TextDesc>
            <TextDescBold>Zabraklo miedzy nami</TextDescBold>
            <TextDesc>
                Dnia 27 lutego 2020 r. zmarła w Częstochowie Elżbieta-Wanda Pytlewska z domu Sobieraj- żona Janusza Pytlewskiego.
            </TextDesc>
            <HistoryButton>Wiesci</HistoryButton>
        </TextContainer>
    );
};

const FamilyNews = () => {
    return (
        <Container>
            <Text />
            <Image />
        </Container>
    );
};

export default FamilyNews;
