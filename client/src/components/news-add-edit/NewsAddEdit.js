import React, { useState } from "react";
import NewsAddEditItem from "./NewsAddEditItem";
import GenInput from "../universal/GenInput";
import GenTextArea from "../universal/GenTextArea";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

const NoNewsContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const NoNews = () => {
    return <NoNewsContainer>No News :(</NoNewsContainer>;
};

const NewsMap = ({ news }) => {
    return (
        <>
            {news.map((data, index) => (
                <NewsAddEditItem key={`newsitem-${index}`} data={data} />
            ))}
        </>
    );
};

NewsMap.propTypes = {
    news: PropTypes.array.isRequired
};

const AddNewsContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddNews = ({ title, text, onChange, onAdd }) => {
    return (
        <AddNewsContainer>
            <GenInput name="title" onChange={onChange} value={title} type="text" />
            <GenTextArea name="text" onChange={onChange} value={text} type="text" />
            <SuccessButton onClick={onAdd}>Add</SuccessButton>
        </AddNewsContainer>
    );
};

AddNews.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

const NewsAddEdit = () => {
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

    const { loading, error, data } = useQuery(NEWS_QUERY);

    const onAdd = () => {
        console.log(formData);
    };

    return (
        <Container>
            <MainTitle>Newsy</MainTitle>
            <AddNews title={title} text={text} onChange={onChange} onAdd={onAdd} />
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.news.length > 0 ? <NewsMap news={data.news} /> : <NoNews />}
        </Container>
    );
};

const NEWS_QUERY = gql`
    {
        news {
            id
            title
            text
            createdAt
        }
    }
`;

export default NewsAddEdit;
