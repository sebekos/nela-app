import React from "react";
import { uuid } from "uuidv4";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    margin: auto;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(5, 200px);
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 200px);
    }
`;

const ImageContainer = styled.div`
    height: 150px;
    overflow: hidden;
    width: fit-content;
    cursor: pointer;
    background-color: lightgrey;
`;

const ImageSrc = styled.img`
    border: 1px solid lightgrey;
    height: 148px;
    width: 198px;
    object-fit: cover;
`;

const Image = ({ link_thumb, onClickThumbnail }) => {
    return (
        <ImageContainer onClick={onClickThumbnail}>
            <ImageSrc src={link_thumb} alt="photo" />
        </ImageContainer>
    );
};

Image.propTypes = {
    link_thumb: PropTypes.string.isRequired,
    galId: PropTypes.number,
    onClickThumbnail: PropTypes.func.isRequired
};

const PreviewPhotos = ({ onClickThumbnail, photos }) => {
    return (
        <Container>
            {photos.map((photo) => {
                return (
                    <Image onClickThumbnail={onClickThumbnail} key={uuid()} link_thumb={photo.link_thumb}>
                        photo
                    </Image>
                );
            })}
        </Container>
    );
};

PreviewPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    onClickThumbnail: PropTypes.func.isRequired
};

export default PreviewPhotos;
