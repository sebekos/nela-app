import React, { useEffect } from "react";
import PersonAddEditItem from "./PersonAddEditItem";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/react-hooks";
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

const Loading = () => {
    return (
        <CircularContainer>
            <CircularProgress />
        </CircularContainer>
    );
};

const AddEdit = () => {
    const [onSearch, { loading, error, data }] = useLazyQuery(SEARCH_PEOPLE_QUERY, {
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        onSearch({ variables: { search: "" } });
    }, [onSearch]);

    return (
        <>
            <PeopleSearch onSearch={onSearch} />
            {loading && <Loading />}
            {!loading && error && <Error />}
            {!loading && data && data.searchPeople && data.searchPeople.results && data.searchPeople.results.length > 0 && (
                <Map people={data.searchPeople.results} />
            )}
            {!loading && data && data.searchPeople && data.searchPeople.results && data.searchPeople.results.length === 0 && <NoData />}
        </>
    );
};

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
