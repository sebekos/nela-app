import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import styled from "styled-components";
import GenSelect from "../universal/GenSelect";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { TextareaAutosize } from "@material-ui/core";

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

const newsTypes = {
    1: "Wydarzyło się",
    2: "Witamy w rodzinie",
    3: "Zabraklo miedzy nami"
};

const ShowContainer = ({ text, type, onEdit }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Information</EditText>
            <TitleText>{newsTypes[type]}</TitleText>
            <BodyText>{text}</BodyText>
        </>
    );
};

ShowContainer.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
};

const TextArea = styled.div`
    margin-bottom: 0.5rem;
    & > textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
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
    width: fit-content;
`;

const Counter = styled.div`
    font-size: 0.8rem;
    margin-top: -0.4rem;
    margin-left: 0.7rem;
    color: grey;
`;

const EditContainer = ({ text, type, onSave, onChange, stopEdit, onDelete }) => {
    return (
        <>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={stopEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
            </SaveEditDeleteContainer>
            <GenSelect name="type" onChange={onChange} value={type}>
                <option defaultValue disabled value="0">
                    News Type
                </option>
                <option value="1">Wydarzyło się</option>
                <option value="2">Witamy w rodzinie</option>
                <option value="3">Zabraklo miedzy nami</option>
            </GenSelect>
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
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

const Item = ({ data }) => {
    const [updateFamilyNews] = useMutation(UPDATE_FAMILY_NEWS_QUERY, {
        onError: (errors) => {
            errors.graphQLErrors.forEach((error) => toast.error(error.message));
        },
        onCompleted: () => {
            toast.success("Family news updated");
            setEdit(false);
        }
    });

    const [deleteFamilyNews] = useMutation(DELETE_FAMILY_NEWS_MUTATION, {
        refetchQueries: [{ query: FAMILY_NEWS_QUERY }],
        onCompleted: () => {
            toast.success("Family news deleted");
        }
    });

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        id: data.id,
        type: `${data.type}`,
        text: data.text
    });

    const { id, type, text } = formData;

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
        updateFamilyNews({
            variables: {
                id,
                type: parseInt(type, 10),
                text
            }
        });
    };

    const onDelete = () => {
        var r = window.confirm("Press OK to delete");
        if (r !== true) return;
        deleteFamilyNews({ variables: { id: parseInt(data.id, 10) } });
    };

    return (
        <Container>
            {edit && <EditContainer type={type} text={text} onSave={onSave} onChange={onChange} stopEdit={stopEdit} onDelete={onDelete} />}
            {!edit && <ShowContainer type={type} text={text} onEdit={onEdit} onChange={onChange} />}
            <DateText>{timeFormat(data.createdAt / 1000)}</DateText>
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_FAMILY_NEWS_QUERY = gql`
    mutation UpdateFamilyNews($id: Int!, $text: String!, $type: Int!) {
        updateFamilyNews(updateFamilyNewsInput: { id: $id, text: $text, type: $type }) {
            id
            type
            text
            createdAt
        }
    }
`;

const FAMILY_NEWS_QUERY = gql`
    {
        familynews {
            id
            text
            type
            createdAt
        }
    }
`;

const DELETE_FAMILY_NEWS_MUTATION = gql`
    mutation DeleteFamilyNews($id: Int!) {
        deleteFamilyNews(id: $id)
    }
`;

export default Item;
