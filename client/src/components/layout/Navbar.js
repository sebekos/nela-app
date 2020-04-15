import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { setNav } from "../../redux/actions/navbar";
import { Link } from "react-router-dom";
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
    const links = ["Home", "Newsy", "Historia", "Zjazdy", "Galeria", "Wiesci", "Contact"];
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
    onNav: PropTypes.func.isRequired,
    currMenu: PropTypes.string.isRequired
};

const AuthLinks = ({ onLogout }) => {
    return (
        <>
            <Link>Dashboard</Link>
            <Link onClick={onLogout}>Logout</Link>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = ({ isAuthenticated, logout, setNav, currMenu }) => {
    useEffect(() => {
        setNav(window.location.pathname.split("/")[1]);
    }, [setNav]);

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const onNav = (e) => {
        setNav(e.target.getAttribute("route"));
    };

    return (
        <Container>
            <Title>Strona Rodin Pytlewskich</Title>
            <LinksContainer>
                {isAuthenticated ? <AuthLinks onLogout={onLogout} /> : <GuestLinks currMenu={currMenu} onNav={onNav} />}
            </LinksContainer>
        </Container>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    setNav: PropTypes.func.isRequired,
    currMenu: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    currMenu: state.navbar.currMenu
});

const mapDispatchAtProps = {
    logout,
    setNav
};

export default connect(mapStateToProps, mapDispatchAtProps)(Navbar);
