import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const SignInContainer = styled.div`
    padding: 20px 20px;
`;

const InputsContainer = ({ onChangeHandler, onSubmitHandler, email, password }) => {
    return (
        <>
            <GenInput type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} required></GenInput>
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
        </>
    );
};

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const [login] = useLazyQuery(LOGIN_QUERY, {
        variables: {
            email,
            password
        },
        onError: () => {
            console.log("Invalid credentials");
        },
        onCompleted: () => {
            console.log("Redirect");
        }
    });
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        login();
    };

    return (
        <>
            <SignInContainer>Sign Into Your Account</SignInContainer>
            <FormContainer onSubmit={onSubmitHandler}>
                <InputsContainer onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} email={email} password={password} />
            </FormContainer>
        </>
    );
};

const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            isAuth
            userId
            token
            tokenExpiration
        }
    }
`;

export default Login;
