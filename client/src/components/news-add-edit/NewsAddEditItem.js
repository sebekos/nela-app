import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
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
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
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

const ShowContainer = ({ text, title, onEdit }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Information</EditText>
            <TitleText>{title}</TitleText>
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

const SaveText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    color: green;
    text-align: right;
    cursor: pointer;
    width: fit-content;
`;

const CancelText = styled(SaveText)`
    color: #333;
`;

const DeleteText = styled(SaveText)`
    color: red;
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

const EditContainer = ({ text, title, onSave, onChange, stopEdit, onDelete }) => {
    return (
        <>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={stopEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
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

const AddEditItem = ({ data }) => {
    const [updateNews] = useMutation(UPDATE_NEWS_QUERY, {
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("News updated");
            setEdit(false);
        }
    });

    const [deleteNews] = useMutation(DELETE_NEWS_MUTATION, {
        refetchQueries: [{ query: NEWS_QUERY }],
        onCompleted: () => {
            toast.success("News deleted");
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

    const stopEdit = () => {
        setEdit(false);
    };

    const onSave = () => {
        updateNews({
            variables: {
                id,
                title: formData.title,
                text: formData.text
            }
        });
    };

    const onDelete = () => {
        deleteNews({ variables: { id: parseInt(data.id) } });
    };

    return (
        <Container>
            {edit ? (
                <EditContainer title={title} text={text} onSave={onSave} onChange={onChange} stopEdit={stopEdit} onDelete={onDelete} />
            ) : null}
            {!edit ? <ShowContainer title={title} text={text} onEdit={onEdit} onChange={onChange} /> : null}
            <DateText>{timeFormat(data.createdAt / 1000)}</DateText>
        </Container>
    );
};

AddEditItem.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_NEWS_QUERY = gql`
    mutation UpdateNews($id: Int!, $title: String!, $text: String!) {
        updateNews(updateNewsInput: { id: $id, title: $title, text: $text }) {
            id
            title
            text
            createdAt
        }
    }
`;

const DELETE_NEWS_MUTATION = gql`
    mutation DeleteNews($id: Int!) {
        deleteNews(id: $id)
    }
`;

const NEWS_QUERY = gql`
    {
        news {
            id
            title
            text
            createdAt
        }
    }
`;

export default AddEditItem;
