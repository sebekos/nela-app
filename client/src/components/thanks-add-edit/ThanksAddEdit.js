import React, { useState } from "react";
import AddEditItem from "./ThanksAddEditItem";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import { TextareaAutosize } from "@material-ui/core";
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
    return <NoDataContainer>No Thank You's :(</NoDataContainer>;
};

const AddContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 1rem;
    color: #333;
    margin: 1rem auto 0;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
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
                    placeholder="Body"
                    name="text"
                    onChange={onChange}
                    value={text}
                    type="text"
                    rowsMin={3}
                    maxLength={500}
                />
                <Counter>{text.length}/500</Counter>
            </TextArea>
            <SuccessButton onClick={onAdd}>Add</SuccessButton>
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

const AddEdit = () => {
    const [addThank] = useMutation(ADD_THANKS_QUERY, {
        refetchQueries: [{ query: THANKS_QUERY }],
        onError: (err) => console.log(err),
        onCompleted: () => {
            toast.success("Thanks added");
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

    return (
        <Container>
            <MainTitle>Thanks</MainTitle>
            <Add text={text} onChange={onChange} onAdd={onAdd} />
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.thanks.length > 0 ? <Map thanks={data.thanks} /> : <NoData />}
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