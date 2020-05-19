import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import GenForm from "../universal/GenForm";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, TextField, List, ListItem, ListItemText, Box } from "@material-ui/core";

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
    & > div {
        width: 100%;
    }
`;

const MapContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
    & > a {
        color: #333;
        text-decoration: none;
    }
`;

const Map = ({ data, history }) => {
    const onClick = (link) => {
        history.push(link);
    };
    return (
        <MapContainer>
            <Box width="500px">
                <List disablePadding={true}>
                    {data.map((person) => {
                        const { first_name, middle_name, last_name, birth_date, passed_date } = person;
                        const name = [first_name, middle_name, last_name].map((item) => (item !== null ? item : null)).join(" ");
                        const dates = [birth_date, passed_date].map((item) => (item !== null ? item : null)).join(" - ");
                        return (
                            <ListItem divider={true} key={uuid()} onClick={(e) => onClick(`/Rodzina/${person.id}`)}>
                                <ListItemText primary={name} secondary={dates} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
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
    const history = useHistory();

    const [search, setSearch] = useState("");
    const [perArray, setResults] = useState(null);

    const { loading: localLoading } = useQuery(LOCAL_RESULTS_QUERY, {
        onCompleted: (data) => setResults(data.search)
    });

    const onChange = (e) => setSearch(e.target.value);

    const [onSearch, { loading: lazyLoading }] = useLazyQuery(SEARCH_PEOPLE_QUERY, {
        onCompleted: (data) => setResults(data)
    });

    const onSubmit = (e) => {
        e.preventDefault();
        onSearch({ variables: { search } });
    };

    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
            <Form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField onChange={onChange} label="First or Last name" variant="filled" value={search} />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Search
                </Button>
            </Form>
            {!localLoading && !lazyLoading && perArray && perArray.searchPeople.results.length > 0 ? (
                <Map data={perArray.searchPeople.results} history={history} />
            ) : (
                <NoResults />
            )}
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
                birth_date
                passed_date
            }
        }
    }
`;

const LOCAL_RESULTS_QUERY = gql`
    {
        search @client
    }
`;

export default Family;
