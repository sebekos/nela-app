import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-color: white;
    position: fixed;
    z-index: 1;
`;

const Title = styled.div`
    font-size: 2rem;
    color: #3e4444;
    margin-left: 3rem;
`;

const LinksContainer = styled.div`
    display: flex;
    justify-self: end;
    margin-right: 3rem;
    & > a {
        font-size: 1rem;
        color: #3e4444;
        margin-right: 1.5rem;
        text-decoration: none;
        &:last-child {
            margin-right: 1.5rem;
        }
    }
`;

const GuestLinks = ({ onNav, currMenu }) => {
    const links = ["Home", "Newsy", "Historia", "Zjazdy", "Galeria", "Wiesci", "Kontakt"];
    return (
        <>
            {links.map((link, index) => {
                return (
                    <Link
                        route={link}
                        to={`/${link !== "Home" ? link : ""}`}
                        key={`guestlinks-${index}`}
                        className={link === currMenu ? "active-link" : null}
                        onClick={onNav}
                    >
                        {link}
                    </Link>
                );
            })}
        </>
    );
};

GuestLinks.propTypes = {
    onNav: PropTypes.func.isRequired
};

const AuthLinks = ({ onLogout }) => {
    return (
        <>
            <Link to="dashboard">Dashboard</Link>
            <Link to="login" onClick={onLogout}>
                Logout
            </Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = () => {
    const { data, client } = useQuery(CHECK_AUTH_QUERY);

    const [currMenu, setCurrMenu] = useState("");

    useEffect(() => {
        const path = window.location.pathname.split("/")[1];
        path ? setCurrMenu(path) : setCurrMenu("Home");
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        client.writeData({
            data: {
                auth: {
                    isAuth: false,
                    userId: null,
                    token: null,
                    tokenExpiration: null,
                    __typename: "UserAuth"
                }
            }
        });
    };

    const onNav = (e) => {
        setCurrMenu(e.target.getAttribute("route"));
    };

    return (
        <Container>
            <Title>Pytlewskich</Title>
            <LinksContainer>
                {data && data.auth.isAuth ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} onNav={onNav} />}
            </LinksContainer>
        </Container>
    );
};

const CHECK_AUTH_QUERY = gql`
    {
        auth @client {
            isAuth
            token
            userId
        }
    }
`;

export default Navbar;
