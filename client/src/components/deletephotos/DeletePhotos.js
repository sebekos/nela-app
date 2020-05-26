import React, { useState } from "react";
import styled from "styled-components";
import DeleteItem from "./DeleteItem";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { uuid } from "uuidv4";

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

const PhotoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const Photos = ({ data, onDelete }) => {
    return (
        <PhotoContainer>
            {data.map((photo) => (
                <DeleteItem image={photo.link_thumb} galleryid={photo.key} onDelete={onDelete} key={uuid()} photoid={photo.id} />
            ))}
        </PhotoContainer>
    );
};

const DeletePhotos = ({ match }) => {
    const [photos, setPhotos] = useState([]);
    const { loading } = useQuery(GALLERY_PHOTOS, {
        variables: {
            id: parseInt(match.params.id)
        },
        onCompleted: (data) => {
            setPhotos(data.photos);
        }
    });
    const onDelete = (e) => {
        let newPhotos = [];
        let image = e.target.value;
        newPhotos = photos.filter((photo) => {
            return photo.link_thumb !== image;
        });
        setPhotos(newPhotos);
    };

    return (
        <Container>
            <MainTitle>Delete Photos</MainTitle>
            {!loading && photos.length > 0 ? <Photos data={photos} onDelete={onDelete} /> : null}
        </Container>
    );
};

const GALLERY_PHOTOS = gql`
    query Photos($id: Int!) {
        photos(filter: $id) {
            key
            id
            link_thumb
        }
    }
`;

export default DeletePhotos;
