import React from "react";
import styled from "styled-components";
import MapPng from "../../img/map.png";
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
            <Img src={MapPng} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    justify-self: end;
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

const HistoryButton = styled(PrimaryButton)`
    padding: 0.5rem 2rem;
    margin: 2rem;
`;

const Text = () => {
    return (
        <TextContainer>
            <TextTitle>Historia</TextTitle>
            <TextDesc>Poszukiwania</TextDesc>
            <TextDesc>
                Z przekazów rodzinnych wiemy o dziejach naszego Rodu niegdyś już spisanego przez naszych pra, pra ... Księga z zapisami
                narodzin, zgonów, nadaniami dóbr i ich konfiskatą za udział w powstaniach, oraz innymi dziejami Rodu była "wędrowna". Nie
                wszyscy w dawnych czasach umieli pisać więc wędrowała do tego który umiał pisać. Księga która przetrwała różne dziejowe
                zawieruchy spłonęła wraz z młynem w Lelowie dnia 03.09.1939 r., a wraz z nią archiwum rodzinne, książki - białe kruki,
                pergaminy. Mamy jednak naszych nestorów jeszcze z doskonałą pamięcią, którzy nam opowiadają jak to dawniej bywało. Godziny
                rozmów - wywiadów są nagrane na taśmach video. Jak się okazuje po wielu latach poszukiwań Pytlewskich w zasobach
                archiwalnych, parafiach, materiałach historycznych, w dokumentach prywatnych zbiorów
            </TextDesc>
            <HistoryButton>Historia</HistoryButton>
        </TextContainer>
    );
};

const History = () => {
    return (
        <Container>
            <Text />
            <Image />
        </Container>
    );
};

export default History;
