import React from "react";
import styled from "styled-components";
import ContactImage from "../../img/contact.jpeg";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const IntroContainer = styled.div`
    position: relative;
`;

const IntroText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
`;

const IntroTextSmall = styled.div`
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
`;

const Image1 = styled.img`
    height: 600px;
    width: 100%;
    object-fit: cover;
`;

const IntroTextContainer = styled.div`
    position: absolute;
    max-width: 1100px;
    color: white;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
`;

const Banner = () => {
    return (
        <IntroContainer>
            <IntroTextContainer>
                <IntroText>We'd love to hear from you.</IntroText>
                <IntroTextSmall>Wether you can a question about our family or yours our team is ready.</IntroTextSmall>
            </IntroTextContainer>
            <Image1 src={ContactImage} alt="image1" />
        </IntroContainer>
    );
};

const ContactInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 800px;
    margin: 5rem auto 5rem;
    text-align: center;
`;

const ContactCol = styled.div`
    width: fit-content;
    margin: auto;
`;

const ContactTitle = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
`;

const ContactBody = styled.p`
    font-size: 1.3rem;
`;

const ContactInfo = () => {
    return (
        <ContactInfoContainer>
            <ContactCol>
                <ContactTitle>Konopaccy</ContactTitle>
                <ContactBody>Barbara Kłosowicz</ContactBody>
                <ContactBody>26 Residence le Bois du Roi</ContactBody>
                <ContactBody>91940 Les Ulis</ContactBody>
                <ContactBody>Francja</ContactBody>
                <ContactBody>e-mail klosowiczb@gmail.com</ContactBody>
            </ContactCol>
            <ContactCol>
                <ContactTitle>Pytlewscy</ContactTitle>
                <ContactBody>Kornelia Major</ContactBody>
                <ContactBody>ul. Orkana 9/44</ContactBody>
                <ContactBody>25-548 Kielce, Polska</ContactBody>
                <ContactBody>tel. (+48) 41 331 93 55</ContactBody>
                <ContactBody>e-mail: nelia@op.pl</ContactBody>
            </ContactCol>
        </ContactInfoContainer>
    );
};

const History = () => {
    return (
        <Container>
            <MainTitle>Kontakt</MainTitle>
            <Banner />
            <ContactInfo />
        </Container>
    );
};

export default History;
