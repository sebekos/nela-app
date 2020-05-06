import React from "react";
import ApError from "../universal/ApError";
import ApLoading from "../universal/ApLoading";
import PhotoViewer from "./PhotoViewer";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";

const Container = styled.div`
    max-width: 1000px;
    margin: auto;
    padding: 6rem 0 0;
    min-height: 100vh;
`;

const InfoContainer = styled.div`
    max-width: 400px;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
`;

const DateText = styled.div`
    font-size: 0.7rem;
`;

const Info = ({ title, text, createdAt }) => {
    return (
        <InfoContainer>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
            <DateText>{timeFormat(createdAt / 1000)}</DateText>
        </InfoContainer>
    );
};

Info.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
};

const GalleryView = ({ match }) => {
    const { data, loading, error } = useQuery(PHOTOS_QUERY, {
        variables: {
            filter: parseInt(match.params.id)
        }
    });
    return (
        <Container>
            {!loading && error ? <ApError /> : null}
            {loading ? <ApLoading /> : null}
            {!loading && data.gallery ? (
                <Info title={data.gallery.title} text={data.gallery.text} createdAt={data.gallery.createdAt} />
            ) : null}
            {!loading && data.photos && data.photos && data.photos.length > 0 ? <PhotoViewer photos={data.photos} /> : null}
        </Container>
    );
};

const PHOTOS_QUERY = gql`
    query PhotoQuery($filter: Int!) {
        gallery(filter: $filter) {
            title
            text
            createdAt
        }
        photos(filter: $filter) {
            order
            key
            link_thumb
            link_main
        }
    }
`;

export default GalleryView;
