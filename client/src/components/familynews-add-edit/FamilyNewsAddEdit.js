import React, { useState } from "react";
import Item from "./Item";
import GenSelect from "../universal/GenSelect";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

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
    return <NoDataContainer>żadnych wiadomości :(</NoDataContainer>;
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
    margin-bottom: 0.5rem;
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

const Add = ({ text, type, onChange, onAdd }) => {
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
            <GenSelect name="type" onChange={onChange} value={type}>
                <option defaultValue disabled value="0">
                    rodzaj
                </option>
                <option value="1">Wydarzyło się</option>
                <option value="2">Witamy w rodzinie</option>
                <option value="3">Zabraklo miedzy nami</option>
            </GenSelect>
            <SuccessButton onClick={onAdd}>Dodaj</SuccessButton>
        </AddContainer>
    );
};

Add.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

const MapContainer = styled.div`
    margin: 3rem auto;
`;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((item) => {
                return <Item key={uuid()} data={item} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
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
    const [addFamilyNews, { loading: lazyLoading }] = useMutation(ADD_FAMILY_NEWS_QUERY, {
        refetchQueries: [{ query: FAMILY_NEWS_QUERY }],
        onCompleted: () => {
            toast.success("News added");
            setFormData({
                text: "",
                type: "0"
            });
        },
        onError: (err) => console.log(err)
    });

    const [formData, setFormData] = useState({
        text: "",
        type: "0"
    });

    const { text, type } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { loading, error, data } = useQuery(FAMILY_NEWS_QUERY);

    const onAdd = (e) => {
        e.preventDefault();
        addFamilyNews({ variables: { text, type: parseInt(type, 10) } });
    };

    if (value !== index) return null;

    return (
        <Container>
            <Add text={text} type={type} onChange={onChange} onAdd={onAdd} />
            {(loading || lazyLoading) && <Loading />}
            {!loading && error && <Error />}
            {!loading && data && data.familynews.length > 0 && <Map data={data.familynews} />}
            {!loading && data && data.familynews.length === 0 && <NoData />}
        </Container>
    );
};

const FAMILY_NEWS_QUERY = gql`
    {
        familynews {
            id
            text
            type
            createdAt
        }
    }
`;

const ADD_FAMILY_NEWS_QUERY = gql`
    mutation AddFamilyNews($text: String!, $type: Int!) {
        addFamilyNews(familyNewsInput: { text: $text, type: $type }) {
            id
            text
            type
            createdAt
        }
    }
`;

export default AddEdit;
