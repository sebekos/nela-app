import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";

const Container = styled.div`
    max-width: 400px;
    margin: 3rem auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    @media (max-width: 680px) {
        margin-top: 1rem;
    }
`;

const FormContainer = styled(GenForm)`
    padding: 0 20px 20px;
`;

const SignInContainer = styled.div`
    padding: 20px 20px;
`;

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        login(formData);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container>
            <SignInContainer>Sign Into Your Account</SignInContainer>
            <FormContainer onSubmit={onSubmitHandler}>
                <GenInput
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    required
                ></GenInput>
                <GenInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    required
                ></GenInput>
                <PrimaryButton type="submit" onClick={onSubmitHandler}>
                    Login
                </PrimaryButton>
            </FormContainer>
        </Container>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
