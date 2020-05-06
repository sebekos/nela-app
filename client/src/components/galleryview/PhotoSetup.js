import React from "react";
import { uuid } from "uuidv4";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    margin: auto;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(5, 200px);
`;

const ImageContainer = styled.div`
    height: 150px;
    overflow: hidden;
    width: fit-content;
`;

const ImageSrc = styled.img`
    border: 1px solid lightgrey;
    height: 148px;
    width: 198px;
    object-fit: cover;
`;

const Image = ({ link_thumb, galId }) => {
    return (
        <ImageContainer>
            <ImageSrc src={`/images/gallery/${galId}/${link_thumb}`} alt="photo" />
        </ImageContainer>
    );
};

Image.propTypes = {
    link_thumb: PropTypes.string.isRequired,
    galId: PropTypes.number
};

const PhotoSetup = ({ photos }) => {
    return (
        <Container>
            {photos.map((photo) => {
                return (
                    <Image key={uuid()} link_thumb={photo.link_thumb} galId={photo.key}>
                        photo
                    </Image>
                );
            })}
        </Container>
    );
};

PhotoSetup.propTypes = {
    photos: PropTypes.array.isRequired
};

export default PhotoSetup;
