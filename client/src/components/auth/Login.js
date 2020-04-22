import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { useLazyQuery, useQuery, useApolloClient } from "@apollo/react-hooks";
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
    const client = useApolloClient();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const [login, { data: loginData, loading: loginLoading }] = useLazyQuery(LOGIN_QUERY);

    const { data: authData } = useQuery(CHECK_AUTH_QUERY);

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("onSubmitHandler");
        login({ variables: { email, password } });
    };

    if (!loginLoading && loginData) {
        const { userId, token, tokenExpiration } = loginData.login;
        client.writeData({
            data: {
                auth: {
                    isAuth: true,
                    userId,
                    token,
                    tokenExpiration,
                    __typename: "UserAuth"
                }
            }
        });
    }

    if (authData && authData.auth.isAuth) {
        return <Redirect to="dashboard" />;
    }

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
            userId
            token
            tokenExpiration
        }
    }
`;

const CHECK_AUTH_QUERY = gql`
    {
        auth @client {
            isAuth
            token
        }
    }
`;

export default Login;
