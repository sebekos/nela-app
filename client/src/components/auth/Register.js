import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/react-hooks";
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

const InputsContainer = ({ onChangeHandler, onSubmitHandler, email, password, password2, register_key }) => {
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
            <GenInput
                type="password"
                placeholder="Retype Password"
                name="password2"
                value={password2}
                onChange={onChangeHandler}
                required
            ></GenInput>
            <GenInput
                type="text"
                placeholder="Register Key"
                name="register_key"
                value={register_key}
                onChange={onChangeHandler}
                required
            ></GenInput>
            <PrimaryButton type="submit" onClick={onSubmitHandler}>
                Register
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

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        register_key: ""
    });
    const { email, password, password2, register_key } = formData;

    const [register, { loading }] = useMutation(REGISTER_QUERY, {
        onError: (err) => console.log(err),
        onCompleted: (data) => {
            const { token, tokenExpiration } = data.register;
            axios.defaults.headers.common["x-auth-token"] = token;
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiration", tokenExpiration);
            toast.dismiss();
        }
    });

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (password !== password2) return toast.error("Passwords do not match");
        register({
            variables: {
                email,
                password,
                register_key
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
            <MainTitle>Register</MainTitle>
            {loading && <Loading />}
            <FormContainer onSubmit={onSubmitHandler}>
                <InputsContainer onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} email={email} password={password} />
            </FormContainer>
        </Container>
    );
};

const REGISTER_QUERY = gql`
    mutation Register($email: String!, $password: String!, $register_key: String!) {
        register(email: $email, password: $password, register_key: $register_key) {
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

export default Register;
