import React, { useState } from "react";
import styled from "styled-components";
import DeleteItem from "./DeleteItem";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { uuid } from "uuidv4";
import SuccessButton from "../universal/SuccessButton";
import { toast } from "react-toastify";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
    width: max-content;
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
    margin: 0.25rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border: 1px solid lightgrey;
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

const ButtonContainer = styled.div``;

const Buttons = ({ onSave }) => {
    return (
        <ButtonContainer>
            <SuccessButton onClick={onSave}>Save</SuccessButton>
        </ButtonContainer>
    );
};

const DeletePhotos = ({ match }) => {
    const [photos, setPhotos] = useState([]);

    const { loading } = useQuery(GALLERY_PHOTOS, {
        variables: {
            id: parseInt(match.params.id, 10)
        },
        onCompleted: (data) => {
            setPhotos(data.photos);
        }
    });

    const [deletePhotos] = useMutation(DELETE_PHOTOS_MUTATION, {
        onCompleted: () => {
            toast.success("Deleted photos");
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

    const onSave = () => {
        let photoIds = photos.map((photo) => parseInt(photo.id, 10));
        deletePhotos({
            variables: {
                photos: photoIds,
                galleryid: parseInt(match.params.id, 10)
            }
        });
    };

    return (
        <Container>
            <MainTitle>Delete Photos</MainTitle>
            <Buttons onSave={onSave} />
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

const DELETE_PHOTOS_MUTATION = gql`
    mutation DeletePhotos($photos: [Int!]!, $galleryid: Int!) {
        deletePhotos(photos: $photos, galleryid: $galleryid)
    }
`;

export default DeletePhotos;
