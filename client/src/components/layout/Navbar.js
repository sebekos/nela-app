import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import PropTypes from "prop-types";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-color: #ffcd26;
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
`;

const SingleLink = styled.div`
    font-size: 1rem;
    color: #3e4444;
    margin-right: 1.5rem;
    &:last-child {
        margin-right: 0rem;
    }
`;

const guestLinks = (
    <>
        <SingleLink>Home</SingleLink>
        <SingleLink>Newsy</SingleLink>
        <SingleLink>Historia</SingleLink>
        <SingleLink>Zjazdy</SingleLink>
        <SingleLink>Galeria</SingleLink>
        <SingleLink>Wiesci</SingleLink>
        <SingleLink>Contact</SingleLink>
    </>
);

const AuthLinks = ({ onLogout }) => {
    return (
        <>
            <SingleLink>Dashboard</SingleLink>
            <SingleLink onClick={onLogout}>Logout</SingleLink>
        </>
    );
};

AuthLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

const Navbar = ({ isAuthenticated, logout }) => {
    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <Container>
            <Title>Strona Rodin Pytlewskich</Title>
            <LinksContainer>{isAuthenticated ? <AuthLinks onLogout={onLogout} /> : guestLinks}</LinksContainer>
        </Container>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchAtProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchAtProps)(Navbar);
