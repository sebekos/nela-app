import React from "react";
import styled from "styled-components";
import LandingImage from "../../img/banner.jpg";

const MainPageContainer = styled.div``;

const MainTitle = styled.div`
    font-size: 2rem;
    color: #3e4444;
    text-align: center;
    padding: 5rem 0 1rem;
    width: 100%;
    background-color: white;
`;

const MainBackground = styled.div`
    background-image: url(${LandingImage});
    min-height: 600px;
    background-position: center top 1rem;
    background-repeat: no-repeat;
    background-size: auto;
`;

const SiteContainer = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: auto;
    padding: 0 5rem;
`;

const TextThin = styled.div`
    margin: auto;
    padding: 2rem 0 0;
`;

const TextBold = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 2rem 0 0;
    font-weight: bold;
`;

const SiteSignature = styled.div`
    font-weight: bold;
    max-width: 1200px;
    margin: auto;
    text-align: right;
    padding: 0 0 2rem;
`;

const Site = () => {
    return (
        <SiteContainer>
            <TextThin>
                Serdecznie witam na stronie www.pytlewski.pl, której celem jest odnalezienie pozostalych czlonków Rodu Pytlewskich
                skoligaconego m. innymi z rodzinami:
            </TextThin>
            <TextBold>
                Konopackich, Dobrzynskich, Dobrzanskich, Dulasinskich, Korytowskich, Malatynskich, Maszewskich, Materskich, Mieczynskich,
                Oginskich, Pagowskich, Kusmierków, Kusnierków i innych.
            </TextBold>
            <TextThin>
                Strona ta mam nadzieje spowoduje, ze odezwa sie rodziny nasze rozproszone na pieciu kontynentach. Zapraszamy do wspólpracy
                wszystkich, którym zalezy na utrwaleniu bogatej historii naszego Rodu.
            </TextThin>
            <SiteSignature>Kornelia z Pytlewskich - Major </SiteSignature>
        </SiteContainer>
    );
};

const MainPage = () => {
    return (
        <MainPageContainer>
            <MainTitle>Strona Rodin Pytlewskich</MainTitle>
            <MainBackground />
            <Site />
        </MainPageContainer>
    );
};

export default MainPage;
