import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
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

    const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
        variables: {
            email,
            password
        },
        fetchPolicy: "network-only",
        onError: (errors) => {
            errors.graphQLErrors.forEach((error) => toast.error(error.message));
        },
        onCompleted: (data) => {
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("tokenExpiration", data.login.tokenExpiration);
        }
    });

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        login();
    };

    const {
        data: {
            auth: { isAuth }
        }
    } = useQuery(AUTH_CHECK_QUERY);

    if (!loading && isAuth) {
        return <Redirect to="dashboard" />;
    }

    return (
        <Container>
            <FormContainer onSubmit={onSubmitHandler}>
                <InputsContainer onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} email={email} password={password} />
            </FormContainer>
        </Container>
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

const AUTH_CHECK_QUERY = gql`
    {
        auth @client {
            isAuth
        }
    }
`;

export default Login;
