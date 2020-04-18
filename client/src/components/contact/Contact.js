import React from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 1200px;
    padding: 6rem 0 0;
    margin: auto;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
    text-align: center;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const Contact = () => {
    return (
        <Container>
            <TextTitle>Kontakt</TextTitle>
            <TextDesc>
                Strona ciągle się rozwija, a jej rozwój zależy od zainteresowania się nią rodziny. W miarę napływu materiałów będziemy ją
                rozbudowywać. W wykazie osób są wymienieni tylko ci, którzy wyrazili na to zgodę. Inni członkowie rodziny będą dopisani po
                skontaktowaniu się.
            </TextDesc>
        </Container>
    );
};

export default Contact;
