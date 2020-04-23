import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
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
    color: white;
`;

const Footer = () => {
    return (
        <Container>
            <TitleText>Contact</TitleText>
            <Link to="/login">
                <LoginText>Login</LoginText>
            </Link>
            <Link to="/newsy">
                <LoginText>News</LoginText>
            </Link>
        </Container>
    );
};

export default Footer;
