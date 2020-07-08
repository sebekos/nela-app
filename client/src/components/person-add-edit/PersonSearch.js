import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import GenForm from "../universal/GenForm";
import styled from "styled-components";

const Form = styled(GenForm)`
    margin: 3rem auto;
    width: 500px;
    height: 100%;
    display: flex;
    & > div {
        width: 100%;
    }
`;

const PersonSearch = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onChange = (e) => setSearch(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        onSearch({ variables: { search } });
    };

    return (
        <Form noValidate autoComplete="off" onSubmit={onSubmit}>
            <TextField onChange={onChange} label="Nazwisko" variant="filled" value={search} />
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Szukaj
            </Button>
        </Form>
    );
};

export default PersonSearch;
