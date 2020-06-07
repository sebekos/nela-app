import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import gql from "graphql-tag";
import axios from "axios";

const Container = styled.div`
    max-width: fit-content;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const FormContainer = styled.form`
    padding: 1rem;
    margin: 5rem auto;
    width: 400px;

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

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = () => {
    return (
        <CircularContainer>
            <CircularProgress />
        </CircularContainer>
    );
};

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
        fetchPolicy: "network-only",
        onError: (err) => console.log(err),
        onCompleted: (data) => {
            toast.dismiss();
            axios.defaults.headers.common["x-auth-token"] = data.login.token;
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("tokenExpiration", data.login.tokenExpiration);
        }
    });

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        login({
            variables: {
                email,
                password
            }
        });
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
            <MainTitle>Login</MainTitle>
            {loading && <Loading />}
            <FormContainer onSubmit={onSubmitHandler}>
                <InputsContainer onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} email={email} password={password} />
            </FormContainer>
        </Container>
    );
};

const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
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
