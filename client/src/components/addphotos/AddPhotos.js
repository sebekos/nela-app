import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "./Uploader";
import SuccessButton from "../universal/SuccessButton";
import { bulkResize } from "../../utils/photo";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

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

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return <LoadingContainer>Loading...</LoadingContainer>;
};

const ErrorContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Error = () => {
    return <ErrorContainer>Error :(</ErrorContainer>;
};

const DescriptionContainer = styled.div`
    margin: auto;
    max-width: 500px;
    text-align: center;
`;
const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
    text-align: left;
    white-space: pre-wrap;
`;

const UploadContainer = styled.div`
    text-align: center;
`;

const UploadButton = styled(SuccessButton)`
    margin-bottom: 1rem;
`;

const Upload = ({ onUpload }) => {
    return (
        <UploadContainer>
            <UploadButton onClick={onUpload}>Upload Images</UploadButton>
        </UploadContainer>
    );
};

Upload.propTypes = {
    onUpload: PropTypes.func.isRequired
};

const Description = ({ title, text }) => {
    return (
        <DescriptionContainer>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
        </DescriptionContainer>
    );
};

Description.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

const ProgressContainer = styled.div`
    margin-bottom: 3rem;
`;

const Progress = ({ progress }) => {
    return (
        <ProgressContainer>
            <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
    );
};

Progress.propTypes = {
    progress: PropTypes.number.isRequired
};

const GoToGalleryContainer = styled.div`
    margin: 0 auto 3rem;
    width: max-content;
`;

const GoToGallery = ({ galleryid }) => {
    return (
        <GoToGalleryContainer>
            <Link to={`/galeria/${galleryid}`}>
                <SuccessButton>Go To Gallery</SuccessButton>
            </Link>
        </GoToGalleryContainer>
    );
};

const AddPhotos = ({ match }) => {
    const [progress, setProgress] = useState(0);
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);

    const { loading, error, data } = useQuery(GALLERY_QUERY, {
        variables: {
            filter: parseInt(match.params.id, 10)
        }
    });

    const onDrop = (picture) => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
            setProgress(0);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async () => {
        let res = await bulkResize(pictures);
        let formData = new FormData();
        formData.append("galleryId", match.params.id);
        res.forEach((photo, index) => {
            formData.append(`reg-${index}`, photo.reg);
            formData.append(`thumb-${index}`, photo.thumbnail);
        });
        await axios
            .post(`/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    setProgress((loaded / total) * 100);
                }
            })
            .then(() => {
                toast.success("Photos uploaded");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <MainTitle>Add Photos</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && !error && data ? <Description title={data.gallery.title} text={data.gallery.text} /> : null}
            {!loading && !error && data ? <Uploader onDrop={onDrop} pictures={pictures} /> : null}
            {progress > 0 && progress < 100 ? <Progress progress={progress} /> : null}
            {uploadBtn && progress === 0 ? <Upload onUpload={onUpload} /> : null}
            {progress === 100 ? <GoToGallery galleryid={match.params.id} /> : null}
        </Container>
    );
};

const GALLERY_QUERY = gql`
    query($filter: Int!) {
        gallery(filter: $filter) {
            id
            title
            text
            createdAt
        }
    }
`;

export default AddPhotos;
