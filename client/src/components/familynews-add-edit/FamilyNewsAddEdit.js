import React, { useState } from "react";
import Item from "./Item";
import GenTextArea from "../universal/GenTextArea";
import GenSelect from "../universal/GenSelect";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
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
    return <NoDataContainer>No Family News :(</NoDataContainer>;
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

const Add = ({ text, type, onChange, onAdd }) => {
    return (
        <AddContainer>
            <GenTextArea autoComplete="off" placeholder="Body" name="text" onChange={onChange} value={text} type="text" />
            <GenSelect name="type" onChange={onChange} value={type}>
                <option defaultValue disabled value="0">
                    News Type
                </option>
                <option value="1">Wydarzyło się</option>
                <option value="2">Witamy w rodzinie</option>
                <option value="3">Zabraklo miedzy nami</option>
            </GenSelect>
            <SuccessButton onClick={onAdd}>Add</SuccessButton>
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

const AddEdit = () => {
    const [addFamilyNews] = useMutation(ADD_FAMILY_NEWS_QUERY, {
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
        addFamilyNews({ variables: { text, type: parseInt(type) } });
    };

    return (
        <Container>
            <MainTitle>Wiesci</MainTitle>
            <Add text={text} type={type} onChange={onChange} onAdd={onAdd} />
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.familynews.length > 0 ? <Map data={data.familynews} /> : <NoData />}
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
