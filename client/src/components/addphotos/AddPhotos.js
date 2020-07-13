import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "./Uploader";
import SuccessButton from "../universal/SuccessButton";
import { bulkResize } from "../../utils/photo";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import axios from "axios";
import { LinearProgress, CircularProgress } from "@material-ui/core";
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

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = () => {
    return (
        <CircularContainer>
            <CircularProgress />
        </CircularContainer>
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
            <UploadButton onClick={onUpload}>Ściągnij</UploadButton>
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
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const { loading, error, data } = useQuery(GALLERY_QUERY, {
        variables: {
            filter: parseInt(match.params.id, 10)
        }
    });

    const [refetchGallery] = useLazyQuery(PHOTOS_QUERY, {
        fetchPolicy: "network-only"
    });

    const onDrop = (picture) => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
            setProgress(0);
            setUploadSuccess(false);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async () => {
        setProgress(0.1);
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
                setUploadSuccess(true);
                setProgress(0);
                toast.success("Photos uploaded");
                refetchGallery({
                    variables: {
                        filter: parseInt(match.params.id, 10)
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <MainTitle>Dodaj Zdjęcia</MainTitle>
            {loading && <Loading />}
            {!loading && error && <Error />}
            {!loading && !error && data && <Description title={data.gallery.title} text={data.gallery.text} />}
            {!loading && !error && data && <Uploader onDrop={onDrop} pictures={pictures} />}
            {progress > 0 && !uploadSuccess && <Progress progress={progress} />}
            {uploadBtn && progress === 0 && !uploadSuccess && <Upload onUpload={onUpload} />}
            {uploadSuccess && <GoToGallery galleryid={match.params.id} />}
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

const PHOTOS_QUERY = gql`
    query Photos($filter: Int!) {
        photos(filter: $filter) {
            order
            key
            link_thumb
            link_main
        }
    }
`;

export default AddPhotos;
