import React from "react";
import NewsItem from "./NewsItem";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const NEWS_QUERY = gql`
    {
        news {
            title
            text
            createdAt
        }
    }
`;

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
`;

const Loading = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Error = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const News = () => {
    const { loading, error, data } = useQuery(NEWS_QUERY);

    if (loading) return <Loading>Loading...</Loading>;
    if (error) return <Error>Error :(</Error>;

    return (
        <Container>
            {data.news.map((data, index) => (
                <NewsItem key={`newsitem-${index}`} data={data} />
            ))}
        </Container>
    );
};

export default News;
