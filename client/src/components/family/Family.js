import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import GenForm from "../universal/GenForm";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, TextField, List, ListItem, ListItemText, CircularProgress } from "@material-ui/core";
import TreePng from "../../img/tree.png";

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

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 1rem 0 0;
    position: relative;
    height: 70px;
`;

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = ({ localLoading, lazyLoading }) => {
    return (
        <LoadingContainer>
            <CircularContainer>{localLoading || lazyLoading ? <CircularProgress /> : null}</CircularContainer>
        </LoadingContainer>
    );
};

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
    max-width: 500px;
    margin: 0rem auto;
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
            <List disablePadding={true}>
                {data.map((person) => {
                    const { first_name, middle_name, last_name, birth_date, birth_location, passed_date } = person;
                    const name = [first_name, middle_name, last_name].map((item) => (item !== null ? item : null)).join(" ");
                    const dates = [birth_date, passed_date].map((item) => (item !== null ? item : null)).join(" - ");
                    const location = birth_location ? `${birth_location}, ` : "";
                    const secondary = `${location}${dates}`;
                    return (
                        <ListItem
                            divider={true}
                            key={uuid()}
                            onClick={(e) => onClick(`/Rodzina/${person.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <ListItemText primary={name} secondary={secondary} />
                        </ListItem>
                    );
                })}
            </List>
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

const TreeImgContainer = styled.div`
    width: max-content;
    margin: auto;
`;

const Image = styled.img`
    width: 500px;
    height: auto;
    margin: 5rem 0;
`;

const Tree = ({ isVisible }) => {
    return (
        <TreeImgContainer>
            <Image className={isVisible ? "fadeIn" : "fadeOut"} src={TreePng} alt="tree" />
        </TreeImgContainer>
    );
};

const Family = () => {
    const history = useHistory();

    const [search, setSearch] = useState("");
    const [perArray, setResults] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const { loading: localLoading } = useQuery(LOCAL_RESULTS_QUERY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            if (data) {
                setIsVisible(false);
                setResults(data.search);
            }
        }
    });

    const [onSearch, { loading: lazyLoading }] = useLazyQuery(SEARCH_PEOPLE_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            setResults(data.searchPeople);
        }
    });

    const onChange = (e) => setSearch(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsVisible(false);
        onSearch({ variables: { search } });
    };

    console.log(perArray);

    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
            <Form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField onChange={onChange} label="First or Last name" variant="filled" value={search} />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Search
                </Button>
            </Form>
            <Loading localLoading={localLoading} lazyLoading={lazyLoading} />
            {!perArray ? <Tree isVisible={isVisible} /> : null}
            {!localLoading && !lazyLoading && perArray && perArray.results.length > 0 ? (
                <Map data={perArray.results} history={history} />
            ) : null}
            {!localLoading && !lazyLoading && perArray && perArray.results.length === 0 ? <NoResults /> : null}
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
                birth_location
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
