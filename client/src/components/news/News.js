import React from "react";
import gql from "graphql-tag";
import Item from "./NewsItem";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
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
    return <NoDataContainer>No News :(</NoDataContainer>;
};

const MapContainer = styled.div`
    margin: 1rem auto 3rem;
`;

const Map = ({ news }) => {
    return (
        <MapContainer>
            {news.map((data) => (
                <Item key={uuid()} data={data} />
            ))}
        </MapContainer>
    );
};

Map.propTypes = {
    news: PropTypes.array.isRequired
};

const News = () => {
    const { loading, error, data } = useQuery(NEWS_QUERY);
    return (
        <Container>
            <MainTitle>Newsy</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.news.news.length > 0 ? <Map news={data.news.news} /> : <NoData />}
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

export default News;
