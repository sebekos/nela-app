import React, { useState } from "react";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import GenForm from "../universal/GenForm";
import SuccessButton from "../universal/SuccessButton";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";

const Container = styled.div``;

const PersonItemContainer = styled.div`
    width: fit-content;
    margin: auto;
    font-weight: normal;
`;

const AddButton = styled(SuccessButton)`
    margin-left: 0.5rem;
`;

const PersonItem = styled.div``;

const Map = ({ data, onAdd }) => {
    return (
        <PersonItemContainer>
            {data.map((person) => (
                <PersonItem key={uuid()}>
                    {person.first_name} {person.last_name}
                    <AddButton onClick={onAdd} value={person.id}>
                        Add
                    </AddButton>
                </PersonItem>
            ))}
        </PersonItemContainer>
    );
};

const Form = styled(GenForm)`
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding: 0.5rem;
`;

const SearchRelation = ({ onAdd }) => {
    const [searchPeople, { loading, data }] = useLazyQuery(SEARCH_PEOPLE_QUERY);
    const [search, setSearch] = useState("");
    const onChange = (e) => setSearch(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        searchPeople({ variables: { search } });
    };
    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <GenInput onChange={onChange} type="text" value={search} />
            </Form>
            {!loading && data && data.searchPeople ? <Map onAdd={onAdd} data={data.searchPeople.results} /> : <p>No People found</p>}
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

export default SearchRelation;
