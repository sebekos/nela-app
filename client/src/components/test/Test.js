import React from "react";
import styled from "styled-components";
import { useApolloClient } from "@apollo/react-hooks";

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
    const client = useApolloClient();
    const onClick = (e) => {
        e.preventDefault();
        client.writeData({
            data: {
                auth: {
                    isAuth: true,
                    userId: "12345",
                    token: "12345",
                    tokenExpiration: "1",
                    __typename: "UserAuth"
                }
            }
        });
    };

    return (
        <Container>
            <FormContainer>
                <button onClick={onClick}>Check</button>
            </FormContainer>
        </Container>
    );
};

export default Test;
