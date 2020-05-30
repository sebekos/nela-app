import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DangerButton from "../universal/DangerButton";
import SuccessButton from "../universal/SuccessButton";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { toast } from "react-toastify";
import { TextareaAutosize, TextField } from "@material-ui/core";

const Container = styled.div`
    position: relative;
    max-width: 800px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
    white-space: pre-wrap;
`;

const DateText = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;

const EditText = styled.div`
    font-size: 0.7rem;
    color: blue;
    float: right;
    cursor: pointer;
`;

const SaveText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    color: blue;
    text-align: right;
    cursor: pointer;
    width: fit-content;
    margin-left: auto;
    margin-right: 0;
`;

const ShowContainer = ({ text, title, onEdit, galleryid }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Information</EditText>
            <Link to={`/galeria/${galleryid}`}>
                <TitleText>{title}</TitleText>
            </Link>
            <BodyText>{text}</BodyText>
        </>
    );
};

ShowContainer.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
};

const Title = styled.div`
    margin: 0 0.5rem 0.5rem;
`;

const TextArea = styled.div`
    margin: 0 0.5rem;
    & > textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0.25rem;
    }
`;

const SaveEditDeleteContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
`;

const Counter = styled.div`
    font-size: 0.8rem;
    margin-top: -0.4rem;
    margin-left: 0.7rem;
    color: grey;
`;

const EditContainer = ({ text, title, onSave, onChange, onCancel, onDelete }) => {
    return (
        <>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <SaveText onClick={onCancel}>Cancel</SaveText>
                <SaveText onClick={onDelete}>Delete</SaveText>
            </SaveEditDeleteContainer>
            <Title>
                <TextField
                    style={{ width: "100%" }}
                    onChange={onChange}
                    label="Title"
                    variant="filled"
                    value={title}
                    name="title"
                    inputProps={{
                        maxLength: 42
                    }}
                    helperText={`${title.length}/${42}`}
                />
            </Title>
            <TextArea>
                <TextareaAutosize
                    autoComplete="off"
                    placeholder="Body"
                    name="text"
                    onChange={onChange}
                    value={text}
                    type="text"
                    rowsMin={3}
                    maxLength={500}
                />
                <Counter>{text.length}/500</Counter>
            </TextArea>
        </>
    );
};

EditContainer.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

const ButtonContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const AddButton = styled(SuccessButton)`
    margin-right: 0.25rem;
`;

const DeleteButton = styled(DangerButton)``;

const Buttons = ({ currid }) => {
    return (
        <ButtonContainer>
            <Link to={`addphotos/${currid}`}>
                <AddButton>Add Photos</AddButton>
            </Link>
            <Link to={`deletephotos/${currid}`}>
                <DeleteButton>Delete Photos</DeleteButton>
            </Link>
        </ButtonContainer>
    );
};

Buttons.propTypes = {
    currid: PropTypes.number
};

const AddEditItem = ({ data }) => {
    const [updateGallery] = useMutation(UPDATE_GALLERY_QUERY, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: () => {
            toast.success("Gallery updated");
            setEdit(false);
        }
    });

    const [deleteGallery] = useMutation(DELETE_GALLERY_MUTATION, {
        refetchQueries: [{ query: GALLERIES_QUERY }],
        onCompleted: () => {
            toast.success("Gallery deleted");
        }
    });

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        id: data.id,
        title: data.title,
        text: data.text
    });

    const { id, title, text } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onEdit = () => {
        setEdit(true);
    };

    const onCancel = () => {
        setEdit(false);
    };

    const onSave = () => {
        updateGallery({
            variables: {
                id,
                title: formData.title,
                text: formData.text
            }
        });
    };

    const onDelete = () => {
        deleteGallery({ variables: { id: parseInt(data.id, 10) } });
    };

    return (
        <Container>
            {edit ? (
                <EditContainer title={title} text={text} onSave={onSave} onChange={onChange} onCancel={onCancel} onDelete={onDelete} />
            ) : null}
            {!edit ? <ShowContainer title={title} text={text} onEdit={onEdit} onChange={onChange} galleryid={data.id} /> : null}
            <Buttons currid={id} />
            <DateText>{timeFormat(data.createdAt / 1000)}</DateText>
        </Container>
    );
};

AddEditItem.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_GALLERY_QUERY = gql`
    mutation UpdateGallery($id: Int!, $title: String!, $text: String!) {
        updateGallery(updateGalleryInput: { id: $id, title: $title, text: $text }) {
            id
            title
            text
            createdAt
        }
    }
`;

const GALLERIES_QUERY = gql`
    {
        galleries {
            galleries {
                id
                title
                text
                createdAt
            }
        }
    }
`;

const DELETE_GALLERY_MUTATION = gql`
    mutation DeleteGallery($id: Int!) {
        deleteGallery(id: $id)
    }
`;

export default AddEditItem;
