import React, { useState } from "react";
import AddEditItem from "./ThanksAddEditItem";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import { TextareaAutosize, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

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
    return <NoDataContainer>brak wpisów :(</NoDataContainer>;
};

const AddContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 1rem;
    color: #333;
    margin: 1rem auto 0;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const TextArea = styled.div`
    & > textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
    }
`;

const Counter = styled.div`
    font-size: 0.8rem;
    margin-top: -0.4rem;
    margin-left: 0.7rem;
    color: grey;
`;

const Add = ({ text, onChange, onAdd }) => {
    return (
        <AddContainer>
            <TextArea>
                <TextareaAutosize
                    autoComplete="off"
                    placeholder="tekst"
                    name="text"
                    onChange={onChange}
                    value={text}
                    type="text"
                    rowsMin={3}
                    maxLength={500}
                />
                <Counter>{text.length}/500</Counter>
            </TextArea>
            <SuccessButton onClick={onAdd}>Dodaj</SuccessButton>
        </AddContainer>
    );
};

Add.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

const MapContainer = styled.div`
    margin: 3rem auto;
`;

const Map = ({ thanks }) => {
    return (
        <MapContainer>
            {thanks.map((data) => {
                return <AddEditItem key={uuid()} data={data} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    thanks: PropTypes.array.isRequired
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

const AddEdit = ({ index, value }) => {
    const [addThank, { loading: lazyLoading }] = useMutation(ADD_THANKS_QUERY, {
        refetchQueries: [{ query: THANKS_QUERY }],
        onError: (err) => console.log(err),
        onCompleted: () => {
            toast.success("Dodany");
            setFormData({
                text: ""
            });
        }
    });

    const [formData, setFormData] = useState({
        text: ""
    });

    const { text } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { loading, error, data } = useQuery(THANKS_QUERY);

    const onAdd = (e) => {
        e.preventDefault();
        addThank({ variables: { text } });
    };

    if (value !== index) return null;

    return (
        <Container>
            <Add text={text} onChange={onChange} onAdd={onAdd} />
            {(loading || lazyLoading) && <Loading />}
            {!loading && error && <Error />}
            {!loading && data && data.thanks.length > 0 && <Map thanks={data.thanks} />}
            {!loading && data && data.thanks.length === 0 && <NoData />}
        </Container>
    );
};

const THANKS_QUERY = gql`
    {
        thanks {
            id
            text
            createdAt
        }
    }
`;

const ADD_THANKS_QUERY = gql`
    mutation AddThank($text: String!) {
        addThank(thankInput: { text: $text }) {
            id
            text
            createdAt
        }
    }
`;

export default AddEdit;
