import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "./Uploader";
import SuccessButton from "../universal/SuccessButton";
import { bulkResize } from "../../utils/photo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import axios from "axios";

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
    text-align: center;
`;
const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
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

const AddPhotos = ({ match }) => {
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);

    const [uploadFile] = useMutation(UPLOAD_QUERY, {
        onError: (err) => console.log(err),
        onCompleted: () => {
            toast.success("Files uploaded");
        }
    });

    const { loading, error, data } = useQuery(GALLERY_QUERY, {
        variables: {
            filter: parseInt(match.params.id)
        }
    });

    const onDrop = (picture) => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async () => {
        let res = await bulkResize(pictures);
        console.log(res);
        let formData = new FormData();
        formData.append("galleryId", match.params.id);
        res.map((photo, index) => {
            formData.append(`reg-${index}`, photo.reg);
            formData.append(`thumb-${index}`, photo.thumbnail);
        });
        const resData = await axios.post(`/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                console.log(loaded);
            }
        });
        // await uploadPhotos(formData);
        // const galleryId = parseInt(match.params.id);
        // const res = await bulkResize(pictures);
        // console.log({ variables: { files: res, galleryId } });
        // uploadFile({ variables: { files: res, galleryId } });
    };

    return (
        <Container>
            <MainTitle>Add Photos</MainTitle>
            {loading ? <Loading /> : null}
            {!loading && error ? <Error /> : null}
            {!loading && !error && data ? <Description title={data.gallery.title} text={data.gallery.text} /> : null}
            {!loading && !error && data ? <Uploader onDrop={onDrop} pictures={pictures} /> : null}
            {uploadBtn ? <Upload onUpload={onUpload} /> : null}
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

const UPLOAD_QUERY = gql`
    mutation GalleryUpload($files: [GalleryUpload!]!, $galleryId: Int!) {
        galleryUpload(files: $files, galleryId: $galleryId)
    }
`;

export default AddPhotos;
