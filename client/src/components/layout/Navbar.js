import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-color: white;
    position: fixed;
    z-index: 1;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Title = styled.div`
    font-size: 2rem;
    color: #3e4444;
    margin-left: 3rem;
    @media (max-width: 768px) {
        margin: auto;
        font-size: 1.5rem;
    }
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
    @media (max-width: 768px) {
        margin: auto;
        & > a {
            &:last-child {
                margin: auto;
            }
        }
    }
`;

const GuestLinks = ({ currMenu }) => {
    const links = ["Główny", "Historia", "Rodzina", "Galeria", "Newsy", "Kontakt"];
    return (
        <>
            {links.map((link, index) => {
                return (
                    <Link
                        route={link}
                        to={`/${link !== "Główny" ? link : ""}`}
                        key={`guestlinks-${index}`}
                        className={link.toLowerCase() === currMenu.toLowerCase() ? "active-link" : null}
                    >
                        {link}
                    </Link>
                );
            })}
        </>
    );
};

const AuthLinks = ({ onLogout }) => {
    return (
        <>
            <Link to="/dashboard">Główny</Link>
            <Link to="/login" onClick={onLogout}>
                Wyloguj
            </Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = ({ history }) => {
    const {
        data: {
            auth: { isAuth }
        }
    } = useQuery(AUTH_CHECK_QUERY);

    const [logout] = useLazyQuery(LOGOUT_QUERY, { fetchPolicy: "no-cache" });

    const [currMenu, setCurrMenu] = useState("");
    const [bottom, setBottom] = useState(false);

    useEffect(() => {
        let currPath = history.location.pathname.split("/")[1];
        currPath = currPath === "" ? "Główny" : currPath;
        setCurrMenu(currPath);
        window.addEventListener("scroll", listenToScroll);
    }, [history.location.pathname]);

    history.listen((location, action) => {
        let currPath = location.pathname.split("/")[1];
        currPath = currPath === "" ? "Główny" : currPath;
        setCurrMenu(currPath);
    });

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const listenToScroll = () => {
        if (window.pageYOffset === 0) {
            setBottom(false);
        } else {
            setBottom(true);
        }
    };

    return (
        <Container className={bottom ? "nav-bottom" : ""}>
            <Title>Pytlewskich</Title>
            <LinksContainer>{isAuth ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} />}</LinksContainer>
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

export default withRouter(Navbar);
