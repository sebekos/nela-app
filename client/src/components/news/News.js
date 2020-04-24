import React from "react";
import NewsItem from "./NewsItem";
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

const NewsMap = ({ news }) => {
    return (
        <>
            {news.map((data, index) => (
                <NewsItem key={`newsitem-${index}`} data={data} />
            ))}
        </>
    );
};

NewsMap.propTypes = {
    news: PropTypes.array.isRequired
};

const News = () => {
    const { loading, error, data } = useQuery(NEWS_QUERY);

    return (
        <Container>
            <MainTitle>Newsy</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data ? <NewsMap news={data.news} /> : null}
        </Container>
    );
};

const NEWS_QUERY = gql`
    {
        news {
            title
            text
            createdAt
        }
    }
`;

export default News;
