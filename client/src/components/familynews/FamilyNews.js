import React from "react";
import styled from "styled-components";
import Happened from "./happened/Happened";
import Hello from "./hello/Hello";
import Later from "./later/Later";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

const Container = styled.div`
    max-width: 800px;
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

const NewsGroupsContainer = styled.div`
    margin: auto;
`;

const NewsGroups = ({ data }) => {
    const happened = data.filter((item) => item.type === 1);
    const hello = data.filter((item) => item.type === 2);
    const later = data.filter((item) => item.type === 3);
    return (
        <NewsGroupsContainer>
            <Happened data={happened} />
            <Hello data={hello} />
            <Later data={later} />
        </NewsGroupsContainer>
    );
};

NewsGroups.propTypes = {
    data: PropTypes.array.isRequired
};

const FamilyNews = () => {
    const { loading, data, error } = useQuery(FAMILY_NEWS_QUERY, {
        onError: () => {
            console.log("error");
        }
    });
    return (
        <Container>
            <MainTitle>Wiesci Rodzinne</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && data.familynews ? <NewsGroups data={data.familynews.familynews} /> : null}
            {!loading && error ? <Error /> : null}
        </Container>
    );
};

const FAMILY_NEWS_QUERY = gql`
    {
        familynews {
            id
            familynews {
                id
                text
                type
                createdAt
            }
        }
    }
`;

export default FamilyNews;
