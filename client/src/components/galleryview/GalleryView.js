import React from "react";
import ApError from "../universal/ApError";
import ApLoading from "../universal/ApLoading";
import PhotoSetup from "./PhotoSetup";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const GalleryView = ({ match }) => {
    const { data, loading, error } = useQuery(PHOTOS_QUERY, {
        variables: {
            filter: parseInt(match.params.id)
        }
    });
    console.log(data);
    return (
        <Container>
            {!loading && error ? <ApError /> : null}
            {loading ? <ApLoading /> : null}
            {!loading && data.photos && data.photos.length > 0 ? <PhotoSetup photos={data.photos} /> : null}
        </Container>
    );
};

const PHOTOS_QUERY = gql`
    query PhotoQuery($filter: Int!) {
        photos(filter: $filter) {
            order
            link_thumb
            link_main
        }
    }
`;

export default GalleryView;
