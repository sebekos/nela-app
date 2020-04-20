import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PropTypes from "prop-types";

const AUTH_QUERY = gql`
    {
        user {
            email
            uuid
        }
    }
`;

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
            <Link onClick={onLogout}>Logout</Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = () => {
    //const { loading, error, data } = useQuery(AUTH_QUERY);
    const [currMenu, setCurrMenu] = useState("");

    useEffect(() => {
        const path = window.location.pathname.split("/")[1];
        path ? setCurrMenu(path) : setCurrMenu("Home");
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        console.log("logout");
    };

    const onNav = (e) => {
        setCurrMenu(e.target.getAttribute("route"));
    };

    //if (loading) return <p>Loading...</p>;

    return (
        <Container>
            <Title>Pytlewskich</Title>
            <LinksContainer>
                {/* {isAuthenticated ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} onNav={onNav} />} */}
                <GuestLinks onNav={onNav} currMenu={currMenu} />
            </LinksContainer>
        </Container>
    );
};

export default Navbar;
