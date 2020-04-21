import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 5rem;
    text-align: center;
    padding: 3rem;
    color: white;
    background-color: #3e4444;
`;

const TitleText = styled.div`
    margin: auto;
    font-size: 1rem;
    font-weight: bold;
`;

const LoginText = styled.div`
    margin: auto;
    font-size: 0.5rem;
`;

const Footer = () => {
    return (
        <Container>
            <TitleText>Contact</TitleText>
            <Link to="/login">
                <LoginText>Login</LoginText>
            </Link>
        </Container>
    );
};

export default Footer;
