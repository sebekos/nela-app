import React, { useState } from "react";
import AddEditItem from "./ReunionAddEditItem";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import { TextareaAutosize, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const Container = styled.div`
    max-width: 1100px;
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

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return <LoadingContainer>Loading...</LoadingContainer>;
};

const ErrorContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Error = () => {
    return <ErrorContainer>Error :(</ErrorContainer>;
};

const NoDataContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const NoData = () => {
    return <NoDataContainer>No Reunions :(</NoDataContainer>;
};

const AddContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 1rem;
    color: #333;
    margin: 1rem auto 0;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const Title = styled.div`
    margin: 0 0 0.5rem 0rem;
`;

const TextArea = styled.div`
    & > textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
    }
`;

const Add = ({ title, text, onChange, onAdd }) => {
    return (
        <AddContainer>
            <Title>
                <TextField
                    autoComplete="off"
                    style={{ width: "100%" }}
                    onChange={onChange}
                    label="Title"
                    variant="filled"
                    value={title}
                    name="title"
                    inputProps={{
                        maxLength: 42
                    }}
                    helperText={`${title.length}/${42}`}
                />
            </Title>
            <TextArea>
                <TextareaAutosize
                    autoComplete="off"
                    placeholder="Body"
                    name="text"
                    onChange={onChange}
                    value={text}
                    type="text"
                    rowsMin={3}
                />
            </TextArea>
            <SuccessButton onClick={onAdd}>Add</SuccessButton>
        </AddContainer>
    );
};

Add.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

const MapContainer = styled.div`
    margin: 3rem auto;
`;

const Map = ({ reunion }) => {
    return (
        <MapContainer>
            {reunion.map((data) => {
                return <AddEditItem key={uuid()} data={data} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    reunion: PropTypes.array.isRequired
};

const AddEdit = () => {
    const [addReunion] = useMutation(ADD_RUNION_QUERY, {
        refetchQueries: [{ query: REUNIONS_QUERY }],
        onError: (err) => console.log(err),
        onCompleted: () => {
            toast.success("Reunion added");
            setFormData({
                title: "",
                text: ""
            });
        }
    });

    const [formData, setFormData] = useState({
        title: "",
        text: ""
    });

    const { title, text } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { loading, error, data } = useQuery(REUNIONS_QUERY);

    const onAdd = (e) => {
        e.preventDefault();
        addReunion({ variables: { title, text } });
    };

    return (
        <Container>
            <MainTitle>Zjazdy</MainTitle>
            <Add title={title} text={text} onChange={onChange} onAdd={onAdd} />
            {loading && <Loading />}
            {!loading && error && <Error />}
            {!loading && data.reunion && data.reunion.length > 0 ? <Map reunion={data.reunion} /> : <NoData />}
        </Container>
    );
};

const REUNIONS_QUERY = gql`
    {
        reunion {
            id
            title
            text
            createdAt
        }
    }
`;

const ADD_RUNION_QUERY = gql`
    mutation AddReunion($title: String!, $text: String!) {
        addReunion(reunionInput: { title: $title, text: $text }) {
            id
            title
            text
            createdAt
        }
    }
`;

export default AddEdit;
