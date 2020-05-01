import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
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
    const links = ["Home", "Rodzina", "Newsy", "Historia", "Zjazdy", "Galeria", "Wiesci", "Kontakt"];
    return (
        <>
            {links.map((link, index) => {
                return (
                    <Link
                        route={link}
                        to={`/${link !== "Home" ? link : ""}`}
                        key={`guestlinks-${index}`}
                        className={link.toLowerCase() === currMenu.toLowerCase() ? "active-link" : null}
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
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login" onClick={onLogout}>
                Logout
            </Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = () => {
    const {
        data: {
            auth: { isAuth }
        }
    } = useQuery(AUTH_CHECK_QUERY);

    const [logout] = useLazyQuery(LOGOUT_QUERY, { fetchPolicy: "no-cache" });

    const [currMenu, setCurrMenu] = useState("");

    useEffect(() => {
        const path = window.location.pathname.split("/")[1];
        path ? setCurrMenu(path) : setCurrMenu("Home");
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const onNav = (e) => {
        setCurrMenu(e.target.getAttribute("route"));
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <Title>Pytlewskich</Title>
            <LinksContainer>{isAuth ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} onNav={onNav} />}</LinksContainer>
        </Container>
    );
};

const AUTH_CHECK_QUERY = gql`
    {
        auth @client {
            isAuth
        }
    }
`;

const LOGOUT_QUERY = gql`
    {
        logout @client
    }
`;

export default Navbar;
