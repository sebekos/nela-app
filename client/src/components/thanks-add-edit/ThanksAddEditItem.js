import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { toast } from "react-toastify";
import { TextareaAutosize } from "@material-ui/core";

const Container = styled.div`
    position: relative;
    max-width: 800px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const BodyText = styled.div`
    font-size: 1rem;
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

const ShowContainer = ({ text, onEdit }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Information</EditText>
            <BodyText>{text}</BodyText>
        </>
    );
};

ShowContainer.propTypes = {
    text: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
};

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

const EditContainer = ({ text, onSave, onChange, stopEdit, onDelete }) => {
    return (
        <>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={stopEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
            </SaveEditDeleteContainer>
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
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

const AddEditItem = ({ data }) => {
    const [updateThank] = useMutation(UPDATE_THANK_QUERY, {
        onError: (errors) => {
            errors.graphQLErrors.forEach((error) => toast.error(error.message));
        },
        onCompleted: () => {
            toast.success("Thank updated");
            setEdit(false);
        }
    });

    const [deleteNews] = useMutation(DELETE_THANK_MUTATION, {
        refetchQueries: [{ query: THANKS_QUERY }],
        onCompleted: () => {
            toast.success("Thank deleted");
        }
    });

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        id: data.id,
        text: data.text
    });

    const { id, text } = formData;

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
        updateThank({
            variables: {
                id,
                text: formData.text
            }
        });
    };

    const onDelete = () => {
        deleteNews({ variables: { id: parseInt(data.id, 10) } });
    };

    return (
        <Container>
            {edit ? <EditContainer text={text} onSave={onSave} onChange={onChange} stopEdit={stopEdit} onDelete={onDelete} /> : null}
            {!edit ? <ShowContainer text={text} onEdit={onEdit} onChange={onChange} /> : null}
            <DateText>{timeFormat(data.createdAt / 1000)}</DateText>
        </Container>
    );
};

AddEditItem.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_THANK_QUERY = gql`
    mutation UpdateThank($id: Int!, $text: String!) {
        updateThank(updateThankInput: { id: $id, text: $text }) {
            id
            text
            createdAt
        }
    }
`;

const DELETE_THANK_MUTATION = gql`
    mutation DeleteThank($id: Int!) {
        deleteThank(id: $id)
    }
`;

const THANKS_QUERY = gql`
    {
        thank {
            id
            text
            createdAt
        }
    }
`;

export default AddEditItem;
