import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import GenTextArea from "../universal/GenTextArea";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { toast } from "react-toastify";

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

const EditContainer = ({ text, title, onSave, onChange }) => {
    return (
        <>
            <SaveText onClick={onSave}>Save</SaveText>
            <GenInput autoComplete="off" name="title" onChange={onChange} value={title} type="text" />
            <GenTextArea autoComplete="off" name="text" onChange={onChange} value={text} type="text" />
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
        onError: (errors) => {
            errors.graphQLErrors.forEach((error) => toast.error(error.message));
        },
        onCompleted: () => {
            toast.success("News updated");
            setEdit(false);
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

    const onSave = () => {
        updateNews({
            variables: {
                id,
                title: formData.title,
                text: formData.text
            }
        });
    };

    return (
        <Container>
            {edit ? <EditContainer title={title} text={text} onSave={onSave} onChange={onChange} /> : null}
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

export default AddEditItem;
