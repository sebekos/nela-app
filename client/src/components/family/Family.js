import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

const Family = () => {
    const { data, loading } = useQuery(SMALL_TREE_QUERY);
    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
        </Container>
    );
};

const SMALL_TREE_QUERY = gql`
    query {
        person(filter: 35) {
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
    }
`;

export default Family;
