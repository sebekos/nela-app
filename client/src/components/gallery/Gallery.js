import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
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
    return <NoDataContainer>No Galleries :(</NoDataContainer>;
};

const MapContainer = styled.div`
    margin: 1rem auto 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((item) => (
                <Item key={uuid()} data={item} />
            ))}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const News = () => {
    const { loading, error, data } = useQuery(GALLERIES_QUERY);
    return (
        <Container>
            <MainTitle>Galeria</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.ui_galleries.galleries.length > 0 ? <Map data={data.ui_galleries.galleries} /> : <NoData />}
        </Container>
    );
};

const GALLERIES_QUERY = gql`
    {
        ui_galleries {
            galleries {
                id
                title
                text
                createdAt
                thumb_1
            }
        }
    }
`;

export default News;
