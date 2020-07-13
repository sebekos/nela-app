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
import moment from "moment";

const Container = styled.div`
    margin: auto;
    padding: 2rem 0 0;
    min-height: 100vh;
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
    @media (max-width: 768px) {
        width: auto;
        padding: 1rem;
    }
`;

const MapContainer = styled.div`
    max-width: 500px;
    margin: 0rem auto;
    & > a {
        color: #333;
        text-decoration: none;
    }
    @media (max-width: 768px) {
        width: auto;
        padding: 1rem;
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
                    const { first_name, middle_name, last_name, birth_date } = person;
                    const name = [first_name, middle_name, last_name].map((item) => (item !== null ? item : null)).join(" ");
                    const dates = birth_date ? moment(birth_date, "YYYY-MM-DD").format("DD/MM/YYYY") : "";
                    const secondary = `${dates}`;
                    return (
                        <ListItem
                            divider={true}
                            key={uuid()}
                            onClick={(e) => onClick(`/Rodzina/${person.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <ListItemText primary={`${name} ${secondary}`} />
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
    return <NoResultsContainer>Brak wyników</NoResultsContainer>;
};

const TreeImgContainer = styled.div`
    width: max-content;
    margin: auto;
`;

const Image = styled.img`
    width: 450px;
    height: auto;
    margin: 1rem 0;
    @media (max-width: 768px) {
        display: none;
    }
`;

const Tree = ({ isVisible }) => {
    return (
        <TreeImgContainer>
            <Image className={isVisible ? "fadeIn" : "fadeOut"} src={TreePng} alt="tree" />
        </TreeImgContainer>
    );
};

const NameSearch = ({ value, index }) => {
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

    if (value !== index) return null;

    return (
        <Container>
            <Form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField onChange={onChange} label="Nazwisko" variant="filled" value={search} />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Szukaj
                </Button>
            </Form>
            <Loading localLoading={localLoading} lazyLoading={lazyLoading} />
            {!perArray && <Tree isVisible={isVisible} />}
            {!localLoading && !lazyLoading && perArray && perArray.results.length > 0 && <Map data={perArray.results} history={history} />}
            {!localLoading && !lazyLoading && perArray && perArray.results.length === 0 && <NoResults />}
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

export default NameSearch;
