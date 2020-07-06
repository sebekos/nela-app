import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/react-hooks";
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

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
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
            <MainTitle>Zarejestrować</MainTitle>
            {loading && <Loading />}
            <LoginContainer>
                <FormContainer onSubmit={onSubmit}>
                    <TextField name="email" type="text" onChange={onChange} value={email} label="Email" variant="filled" />
                    <TextField name="password" type="password" onChange={onChange} value={password} label="Hasło" variant="filled" />
                    <TextField name="password2" type="password" onChange={onChange} value={password2} label="Hasło" variant="filled" />
                    <TextField
                        name="register_key"
                        type="password"
                        onChange={onChange}
                        value={register_key}
                        label="Register Key"
                        variant="filled"
                    />
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Zarejestrować
                    </Button>
                </FormContainer>
            </LoginContainer>
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
