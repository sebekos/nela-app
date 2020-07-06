import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { CircularProgress, TextField, Button } from "@material-ui/core";
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

const LoginContainer = styled.div`
    width: max-content;
    margin-top: 3rem;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    & > div {
        margin: 0 0 1rem 0;
    }
`;

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

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
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
            <MainTitle>Zaloguj Sie</MainTitle>
            {loading && <Loading />}
            <LoginContainer>
                <FormContainer onSubmit={onSubmit}>
                    <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                    <TextField name="password" type="password" onChange={onChange} value={password} label="Hasło" variant="filled" />
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Zaloguj Sie
                    </Button>
                </FormContainer>
            </LoginContainer>
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
