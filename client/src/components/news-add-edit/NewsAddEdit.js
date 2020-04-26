import React, { useState } from "react";
import NewsAddEditItem from "./NewsAddEditItem";
import GenInput from "../universal/GenInput";
import GenTextArea from "../universal/GenTextArea";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

const NoNewsContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const NoNews = () => {
    return <NoNewsContainer>No News :(</NoNewsContainer>;
};

const AddNewsContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 1rem;
    color: #333;
    margin: 1rem auto 0;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddNews = ({ title, text, onChange, onAdd }) => {
    return (
        <AddNewsContainer>
            <GenInput autoComplete="off" placeholder="Title" name="title" onChange={onChange} value={title} type="text" />
            <GenTextArea autoComplete="off" placeholder="Body" name="text" onChange={onChange} value={text} type="text" />
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

const NewsMapContainer = styled.div`
    margin: 3rem auto;
`;

const NewsMap = ({ news }) => {
    return (
        <NewsMapContainer>
            {news.map((data) => {
                return <NewsAddEditItem key={uuid()} data={data} />;
            })}
        </NewsMapContainer>
    );
};

NewsMap.propTypes = {
    news: PropTypes.array.isRequired
};

const NewsAddEdit = () => {
    const [addNews] = useMutation(ADD_NEWS_QUERY, {
        onError: (errors) => {
            console.log(errors);
            errors.graphQLErrors.forEach((error) => toast.error(error.message));
        },
        refetchQueries: [{ query: NEWS_QUERY }],
        onCompleted: () => {
            toast.success("News added");
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

    const { loading, error, data } = useQuery(NEWS_QUERY);

    const onAdd = (e) => {
        e.preventDefault();
        addNews({ variables: { title, text } });
    };

    return (
        <Container>
            <MainTitle>Newsy</MainTitle>
            <AddNews title={title} text={text} onChange={onChange} onAdd={onAdd} />
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.news.news.length > 0 ? <NewsMap news={data.news.news} /> : <NoNews />}
        </Container>
    );
};

const NEWS_QUERY = gql`
    {
        news {
            id
            news {
                id
                title
                text
                createdAt
            }
        }
    }
`;

const ADD_NEWS_QUERY = gql`
    mutation AddNews($title: String!, $text: String!) {
        addNews(newsInput: { title: $title, text: $text }) {
            id
            title
            text
            createdAt
        }
    }
`;

export default NewsAddEdit;
