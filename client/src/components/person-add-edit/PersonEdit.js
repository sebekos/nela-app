import React, { useState } from "react";
import PersonAddEditItem from "./PersonAddEditItem";
import styled from "styled-components";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import PeopleSearch from "./PersonSearch";

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
    return <NoDataContainer>No People :(</NoDataContainer>;
};

const MapContainer = styled.div`
    margin: 3rem auto;
`;

const Map = ({ people }) => {
    return (
        <MapContainer>
            {people.map((data) => {
                return <PersonAddEditItem key={uuid()} data={data} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    people: PropTypes.array.isRequired
};

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
            {loading || lazyLoading ? <Loading /> : null}
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
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
            notes
        }
    }
`;

const SEARCH_PEOPLE_QUERY = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
                first_name
                middle_name
                last_name
                birth_date
                passed_date
                link_photo
            }
        }
    }
`;

export default AddEdit;
