import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { toast } from "react-toastify";
import styled from "styled-components";
import GenSelect from "../universal/GenSelect";
import GenTextArea from "../universal/GenTextArea";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";

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

const ShowContainer = ({ text, type, onEdit }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Information</EditText>
            <TitleText>{type}</TitleText>
            <BodyText>{text}</BodyText>
        </>
    );
};

ShowContainer.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
};

const EditContainer = ({ text, type, onSave, onChange }) => {
    return (
        <>
            <SaveText onClick={onSave}>Save</SaveText>
            <GenSelect name="type" onChange={onChange} value={type}>
                <option defaultValue disabled value="0">
                    News Type
                </option>
                <option value="1">Wydarzyło się</option>
                <option value="2">Witamy w rodzinie</option>
                <option value="3">Zabraklo miedzy nami</option>
            </GenSelect>
            <GenTextArea autoComplete="off" name="text" onChange={onChange} value={text} type="text" />
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

    const onSave = () => {
        updateFamilyNews({
            variables: {
                id,
                type: parseInt(type),
                text
            }
        });
    };

    return (
        <Container>
            {edit ? <EditContainer type={type} text={text} onSave={onSave} onChange={onChange} /> : null}
            {!edit ? <ShowContainer type={type} text={text} onEdit={onEdit} onChange={onChange} /> : null}
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

export default Item;
