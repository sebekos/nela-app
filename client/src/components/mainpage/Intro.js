import React from "react";
import LandingImage from "../../img/banner.jpg";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
`;

const MainBackground = styled.div`
    background-image: url(${LandingImage});
    min-height: 600px;
    background-position: center top 0rem;
    background-repeat: no-repeat;
    background-size: auto;
    background-color: lightgrey;
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
    text-align: center;
`;

const TextBold = styled.div`
    margin: auto;
    padding: 2rem 0 0;
    font-weight: bold;
    text-align: center;
`;

const SiteSignature = styled.div`
    font-weight: bold;
    margin: auto;
    text-align: right;
    padding: 2rem 0 2rem;
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

const Intro = () => {
    return (
        <Container>
            <MainBackground />
            <Site />
        </Container>
    );
};

export default Intro;
