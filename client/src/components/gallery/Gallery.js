import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText, Paper, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

const SmallTitle = styled.div`
    color: #3e4444;
    width: 100%;
    background-color: white;
    font-weight: bold;
    padding: 2rem 0 0 5rem;
    font-size: 1rem;
`;

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
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
    return <NoDataContainer>No Galleries :(</NoDataContainer>;
};

const MapContainer = styled.div`
    margin: 0rem auto 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((item) => (
                <Item key={uuid()} data={item} />
            ))}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const GalleryList = ({ data, history }) => {
    const onClick = (link) => {
        history.push(`/galeria/${link}`);
    };
    return (
        <Paper style={{ maxHeight: 400, overflow: "auto", width: "500px", margin: "auto", border: "1px solid lightgrey" }}>
            <List>
                {data.map((item) => (
                    <ListItem divider={true} key={uuid()} style={{ cursor: "pointer" }} onClick={(e) => onClick(item.id)}>
                        <ListItemText
                            primary={item.title}
                            secondary={item.text}
                            style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

GalleryList.propTypes = {
    data: PropTypes.array.isRequired
};

const Gallery = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(GALLERIES_QUERY);
    return (
        <Container>
            <MainTitle>Galeria</MainTitle>
            {loading && <Loading />}
            {!loading && error && <Error />}
            {!loading && data && data.galleries.galleries.length > 0 && <GalleryList data={data.galleries.galleries} history={history} />}
            <SmallTitle>Most recent</SmallTitle>
            {!loading && data && data.ui_galleries.galleries.length > 0 && <Map data={data.ui_galleries.galleries} />}
            {data && data.ui_galleries.galleries.length === 0 && <NoData />}
        </Container>
    );
};

const GALLERIES_QUERY = gql`
    {
        galleries {
            id
            galleries {
                id
                createdAt
                text
                title
            }
        }
        ui_galleries {
            galleries {
                id
                title
                text
                createdAt
                thumb_1
            }
        }
    }
`;

export default Gallery;
