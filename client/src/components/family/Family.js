import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import SuccessButton from "../universal/SuccessButton";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
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

const Form = styled(GenForm)`
    margin: auto;
    width: 500px;
    height: 100%;
    display: flex;
`;

const SearchInput = styled(GenInput)`
    margin-bottom: 0;
    display: inline-block;
    padding: 10px 20px;
`;

const SearchButton = styled(SuccessButton)`
    display: inline-block;
    margin-bottom: 0;
`;

const MapContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
`;

const PersonItemContainer = styled.div``;

const PersonText = styled.span`
    padding: 3px;
`;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((person) => {
                return (
                    <Link key={uuid()} to={`/Rodzina/${person.id}`}>
                        <PersonItemContainer>
                            <PersonText>{person.first_name}</PersonText>
                            <PersonText>{person.middle_name}</PersonText>
                            <PersonText>{person.last_name}</PersonText>
                            <PersonText>{person.birth_date}</PersonText>
                            <PersonText>{person.passed_date}</PersonText>
                        </PersonItemContainer>
                    </Link>
                );
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const NoResultsContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
`;

const NoResults = () => {
    return <NoResultsContainer>No Results Found</NoResultsContainer>;
};

const Family = () => {
    const [search, setSearch] = useState("");

    const onChange = (e) => setSearch(e.target.value);

    const [onSearch, { data, loading }] = useLazyQuery(SEARCH_PEOPLE_QUERY);

    const onSubmit = (e) => {
        e.preventDefault();
        onSearch({ variables: { search } });
    };

    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
            <Form noValidate autoComplete="off" onSubmit={onSubmit}>
                <SearchInput onChange={onChange} type="text" placeholder="Search" value={search} />
                <SearchButton onClick={onSubmit}>Search</SearchButton>
            </Form>
            {!loading && data && data.searchPeople.results.length > 0 ? <Map data={data.searchPeople.results} /> : <NoResults />}
        </Container>
    );
};

const SEARCH_PEOPLE_QUERY = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
                first_name
                middle_name
                last_name
            }
        }
    }
`;

export default Family;
