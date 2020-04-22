import React from "react";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Container = styled.div`
    padding: 5rem 0 0;
`;

const FormContainer = styled.form`
    padding: 1rem;
    margin: 5rem auto;
    max-width: 400px;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    @media (max-width: 680px) {
        margin-top: 1rem;
    }
`;

const Test = () => {
    const [chat, { data }] = useLazyQuery(IS_LOGGED_IN);

    const onClick = (e) => {
        e.preventDefault();
        console.log("here");
        chat();
    };

    if (data) {
        console.log(data);
    }

    return (
        <Container>
            <FormContainer>
                <button onClick={onClick}>Check</button>
            </FormContainer>
        </Container>
    );
};

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export default Test;
