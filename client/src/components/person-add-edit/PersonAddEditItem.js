import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import GenTextArea from "../universal/GenTextArea";
import PropTypes from "prop-types";
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

const EditText = styled.div`
    font-size: 0.7rem;
    color: blue;
    float: right;
    cursor: pointer;
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

const ShowContainer = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onEdit }) => {
    return (
        <>
            <EditText onClick={onEdit}>Edit Person</EditText>
            <TitleText>{first_name}</TitleText>
            <TitleText>{middle_name}</TitleText>
            <TitleText>{last_name}</TitleText>
            <TitleText>{birth_date}</TitleText>
            <TitleText>{passed_date}</TitleText>
            <BodyText>{notes}</BodyText>
        </>
    );
};

ShowContainer.propTypes = {
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    last_name: PropTypes.string,
    birth_date: PropTypes.string,
    passed_date: PropTypes.string,
    notes: PropTypes.string,
    onEdit: PropTypes.func.isRequired
};

const EditContainer = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onSave, onChange, onEdit, onDelete }) => {
    return (
        <>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={onEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
            </SaveEditDeleteContainer>
            <GenInput autoComplete="off" placeholder="First Name" name="first_name" onChange={onChange} value={first_name} type="text" />
            <GenInput autoComplete="off" placeholder="Middle Name" name="middle_name" onChange={onChange} value={middle_name} type="text" />
            <GenInput autoComplete="off" placeholder="Last Name" name="last_name" onChange={onChange} value={last_name} type="text" />
            <GenInput autoComplete="off" placeholder="Birth Date" name="birth_date" onChange={onChange} value={birth_date} type="date" />
            <GenInput autoComplete="off" placeholder="Passed Date" name="passed_date" onChange={onChange} value={passed_date} type="date" />
            <GenTextArea autoComplete="off" placeholder="Notes" name="notes" onChange={onChange} value={notes} type="text" />
        </>
    );
};

EditContainer.propTypes = {
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    last_name: PropTypes.string,
    birth_date: PropTypes.string,
    passed_date: PropTypes.string,
    notes: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const Item = ({ data }) => {
    const [updatePerson] = useMutation(UPDATE_PERSON_QUERY, {
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person updated");
            setEdit(false);
        }
    });

    const [deletePerson] = useMutation(DELETE_PERSON_QUERY, {
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person deleted");
            setEdit(false);
        }
    });

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        first_name: data.first_name ? data.first_name : "",
        middle_name: data.middle_name ? data.middle_name : "",
        last_name: data.last_name,
        birth_date: data.birth_date ? data.birth_date : "",
        passed_date: data.passed_date ? data.passed_date : "",
        notes: data.notes ? data.notes : ""
    });

    const { first_name, middle_name, last_name, birth_date, passed_date, notes } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onEdit = () => {
        setEdit(!edit);
    };

    const onSave = () => {
        updatePerson({ variables: { first_name, middle_name, last_name, birth_date, passed_date, notes } });
    };

    const onDelete = () => {
        console.log("Delete");
        deletePerson({ variables: { id: parseInt(data.id) } });
    };

    return (
        <Container>
            {edit ? (
                <EditContainer
                    first_name={first_name}
                    middle_name={middle_name}
                    last_name={last_name}
                    birth_date={birth_date}
                    passed_date={passed_date}
                    notes={notes}
                    onSave={onSave}
                    onChange={onChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ) : null}
            {!edit ? (
                <ShowContainer
                    first_name={first_name}
                    middle_name={middle_name}
                    last_name={last_name}
                    birth_date={birth_date}
                    passed_date={passed_date}
                    notes={notes}
                    onEdit={onEdit}
                />
            ) : null}
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_PERSON_QUERY = gql`
    mutation AddPerson(
        $first_name: String
        $middle_name: String
        $last_name: String!
        $birth_date: String
        $passed_date: String
        $notes: String
    ) {
        addPerson(
            personInput: {
                first_name: $first_name
                middle_name: $middle_name
                last_name: $last_name
                birth_date: $birth_date
                passed_date: $passed_date
                notes: $notes
            }
        ) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
            notes
        }
    }
`;

const DELETE_PERSON_QUERY = gql`
    mutation($id: Int!) {
        deletePerson(id: $id)
    }
`;

export default Item;
