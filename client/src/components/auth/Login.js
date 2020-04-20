import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const MUTATION_UPDATE_AUTH = gql`
    mutation($userId: String!, $token: String!, $tokenExpiration: String!) {
        updateAuth(userId: $userId, token: $token, tokenExpiration: $tokenExpiration) @client
    }
`;

const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

const LOCAL_STATE = gql`
    {
        auth @client {
            isAuthenticated
            userId
            token
        }
    }
`;

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
    const [updateAuth] = useMutation(MUTATION_UPDATE_AUTH, { variables: { userId: "test123", token: "asdsdasdas", tokenExpiration: "1" } });
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const [login, { data }] = useLazyQuery(LOGIN_QUERY);

    // if (data) {
    //     console.log(data);
    //     updateAuth();
    //     return <Redirect to="/dashboard" />;
    // }

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("here");
        //login({ variables: { email, password } });
        updateAuth();
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

export default Login;
