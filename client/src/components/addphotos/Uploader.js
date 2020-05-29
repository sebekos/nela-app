import React from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";

const UploaderContainer = styled.div`
    text-align: center;
    width: 100%;
    margin: 5px auto;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const Uploader = ({ onDrop, pictures }) => {
    return (
        <UploaderContainer>
            <ImageUploader
                withIcon={false}
                buttonText="Choose Images"
                onChange={(pictures) => onDrop(pictures)}
                imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
                maxFileSize={30485760}
                withPreview={true}
            />
        </UploaderContainer>
    );
};

Uploader.propTypes = {
    onDrop: PropTypes.func.isRequired,
    pictures: PropTypes.array.isRequired
};

export default Uploader;
