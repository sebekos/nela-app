import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
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

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const [login, { loading, data }] = useLazyQuery(LOGIN_QUERY, { variables: { email, password } });

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        login();
    };

    if (data) {
        console.log(data);
    }

    return (
        <>
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
            {loading ? <p>Loading</p> : null}
        </>
    );
};

export default Login;
