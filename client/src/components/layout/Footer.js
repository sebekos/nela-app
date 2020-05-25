import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    text-align: center;
    padding: 3rem 0;
    color: white;
    background-color: #3e4444;
`;

const TitleText = styled.div`
    margin: auto;
    font-size: 1.7rem;
`;

const LoginText = styled.div`
    margin: auto;
    font-size: 0.5rem;
    color: white;
`;

const ContactInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 700px;
    margin: 1rem auto 2rem;
`;

const ContactCol = styled.div`
    width: fit-content;
    margin: auto;
`;

const ContactTitle = styled.div`
    font-size: 1.3rem;
`;

const ContactBody = styled.p`
    font-size: 0.9rem;
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

const AdminInfoContainer = styled.div``;

const AdminInfo = () => {
    return (
        <AdminInfoContainer>
            <ContactTitle>Administrator</ContactTitle>
            <ContactBody>Kontakt w celach związanych ze strona merytoryczną strony.</ContactBody>
            <ContactBody>Jeżeli masz jakiś pomysł, co można by zmienić lub poprawić - pisz.</ContactBody>
            <ContactBody>e-mail: administrator@pytlewski.pl</ContactBody>
        </AdminInfoContainer>
    );
};

const CopyRight = styled.div`
    margin: 2rem 0;
`;

const currDate = new Date();

const Footer = () => {
    return (
        <Container>
            <TitleText>Kontakt</TitleText>
            <Link to="/login">
                <LoginText>Login</LoginText>
            </Link>
            <ContactInfo />
            <AdminInfo />
            <CopyRight>&copy; Sebekos {currDate.getFullYear()}</CopyRight>
        </Container>
    );
};

export default Footer;
