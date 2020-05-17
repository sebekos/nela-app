import React from "react";
import PersonAddEditItem from "./PersonAddEditItem";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

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
    const { loading, error, data } = useQuery(PEOPLE_QUERY);
    return (
        <>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && data && data.people && data.people.length > 0 ? <Map people={data.people} /> : <NoData />}
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

export default AddEdit;
