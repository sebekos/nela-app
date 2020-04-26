import React from "react";
import styled from "styled-components";
import Item from "./ReunionItem";
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

const NoDataContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const NoData = () => {
    return <NoDataContainer>No Reunions :(</NoDataContainer>;
};

const Map = ({ reunion }) => {
    return (
        <>
            {reunion.map((data, index) => (
                <Item key={`newsitem-${index}`} data={data} />
            ))}
        </>
    );
};

Map.propTypes = {
    reunion: PropTypes.array.isRequired
};

const Reunion = () => {
    const { loading, error, data } = useQuery(REUNION_QUERY);
    return (
        <Container>
            <MainTitle>Zjazdy</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data.reunion.reunion && data.reunion.reunion.length > 0 ? <Map reunion={data.reunion.reunion} /> : <NoData />}
        </Container>
    );
};

const REUNION_QUERY = gql`
    {
        reunion {
            id
            reunion {
                title
                text
                createdAt
            }
        }
    }
`;

export default Reunion;
