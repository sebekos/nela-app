import React from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 1100px;
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

const TextDesc = styled.div`
    font-size: 1rem;
`;

const Contact = () => {
    return (
        <Container>
            <MainTitle>Kontakt</MainTitle>
            <TextDesc>
                Strona ciągle się rozwija, a jej rozwój zależy od zainteresowania się nią rodziny. W miarę napływu materiałów będziemy ją
                rozbudowywać. W wykazie osób są wymienieni tylko ci, którzy wyrazili na to zgodę. Inni członkowie rodziny będą dopisani po
                skontaktowaniu się.
            </TextDesc>
        </Container>
    );
};

export default Contact;
