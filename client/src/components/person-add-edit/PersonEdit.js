import React, { useState } from "react";
import PersonAddEditItem from "./PersonAddEditItem";
import styled from "styled-components";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import PeopleSearch from "./PersonSearch";
import { CircularProgress } from "@material-ui/core";

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
    return <NoDataContainer>No People :(</NoDataContainer>;
};

const MapContainer = styled.div`
    margin: 3rem auto;
`;

const Map = ({ people }) => {
    return (
        <MapContainer>
            {people.map((data) => {
                return <PersonAddEditItem key={uuid()} id={data.id} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    people: PropTypes.array.isRequired
};

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const AddEdit = () => {
    const { loading, error } = useQuery(PEOPLE_QUERY, {
        onCompleted: (data) => setResults(data.people)
    });

    const [perArray, setResults] = useState(null);

    const [onSearch, { loading: lazyLoading }] = useLazyQuery(SEARCH_PEOPLE_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => setResults(data.searchPeople.results)
    });

    return (
        <>
            <PeopleSearch onSearch={onSearch} />
            {loading || lazyLoading ? (
                <CircularContainer>
                    <CircularProgress />
                </CircularContainer>
            ) : null}
            {!loading && error && <Error />}
            {!loading && !lazyLoading && perArray && perArray.length > 0 && <Map people={perArray} />}
            {!loading && !lazyLoading && perArray && perArray.length === 0 && <NoData />}
        </>
    );
};

const PEOPLE_QUERY = gql`
    {
        people {
            id
        }
    }
`;

const SEARCH_PEOPLE_QUERY = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
            }
        }
    }
`;

export default AddEdit;
