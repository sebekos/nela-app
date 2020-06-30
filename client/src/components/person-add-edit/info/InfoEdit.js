import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { TextField, TextareaAutosize, CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const EditContainer = styled.div`
    position: relative;
`;

const EditRow1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0.5rem 0 0rem;
    & > div {
        margin: 0 0.5rem;
    }
`;

const EditRow2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    & > div {
        margin: 0 0.5rem;
    }
`;

const EditRow3 = styled.div`
    padding: 1rem 0.5rem 0.5rem;
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
    z-index: 1000;
`;

const Counter = styled.div`
    font-size: 0.8rem;
    margin-top: -0.4rem;
    margin-left: 0.7rem;
    color: grey;
`;

const InfoEdit = ({ data, stopEdit }) => {
    const [updatePerson, { loading: updateLoading }] = useMutation(UPDATE_PERSON_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person updated");
            stopEdit();
        }
    });

    const [deletePerson, { loading: deleteLoading }] = useMutation(DELETE_PERSON_MUTATION, {
        refetchQueries: [{ query: SEARCH_PEOPLE_QUERY, variables: { search: "" } }],
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person deleted");
            stopEdit();
        }
    });

    const [formData, setFormData] = useState({
        id: data.id ? data.id : 0,
        first_name: data.first_name ? data.first_name : "",
        middle_name: data.middle_name ? data.middle_name : "",
        last_name: data.last_name,
        birth_date: data.birth_date ? data.birth_date : "",
        birth_location: data.birth_location ? data.birth_location : "",
        passed_location: data.passed_location ? data.passed_location : "",
        passed_date: data.passed_date ? data.passed_date : "",
        notes: data.notes ? data.notes : ""
    });

    const { first_name, middle_name, last_name, birth_date, birth_location, passed_location, passed_date, notes } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSave = () => {
        updatePerson({
            variables: {
                id: parseInt(data.id, 10),
                first_name,
                middle_name,
                last_name,
                birth_date,
                birth_location,
                passed_date,
                passed_location,
                notes
            }
        });
    };

    const onDelete = () => {
        var r = window.confirm("Press OK to delete");
        if (r !== true) return;
        deletePerson({
            variables: { id: parseInt(data.id, 10) }
        });
    };

    return (
        <EditContainer>
            <CircularContainer>{updateLoading || deleteLoading ? <CircularProgress /> : null}</CircularContainer>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={stopEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
            </SaveEditDeleteContainer>
            <EditRow1>
                <TextField
                    name="first_name"
                    onChange={onChange}
                    label="First name"
                    variant="filled"
                    value={first_name}
                    inputProps={{
                        maxLength: 24
                    }}
                    helperText={`${first_name.length}/${24}`}
                />
                <TextField
                    name="middle_name"
                    onChange={onChange}
                    label="Middle name"
                    variant="filled"
                    value={middle_name}
                    inputProps={{
                        maxLength: 24
                    }}
                    helperText={`${middle_name.length}/${24}`}
                />
                <TextField
                    name="last_name"
                    onChange={onChange}
                    label="Last name"
                    variant="filled"
                    value={last_name}
                    inputProps={{
                        maxLength: 40
                    }}
                    helperText={`${last_name.length}/${40}`}
                />
            </EditRow1>
            <EditRow2>
                <TextField
                    name="birth_date"
                    variant="filled"
                    id="date"
                    label="Birthday"
                    type="date"
                    onChange={onChange}
                    value={birth_date}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    name="birth_location"
                    onChange={onChange}
                    label="Birth location"
                    variant="filled"
                    value={birth_location}
                    inputProps={{
                        maxLength: 40
                    }}
                    helperText={`${birth_location.length}/${40}`}
                />
            </EditRow2>
            <EditRow2>
                <TextField
                    name="passed_date"
                    variant="filled"
                    id="date"
                    label="Passed"
                    type="date"
                    onChange={onChange}
                    value={passed_date}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    name="passed_location"
                    onChange={onChange}
                    label="Passed location"
                    variant="filled"
                    value={passed_location}
                    inputProps={{
                        maxLength: 40
                    }}
                    helperText={`${passed_location.length}/${40}`}
                />
            </EditRow2>
            <EditRow3>
                <TextareaAutosize
                    aria-label="empty textarea"
                    autoComplete="off"
                    placeholder="Notes"
                    name="notes"
                    onChange={onChange}
                    value={notes}
                    type="text"
                    rowsMin={3}
                    maxLength={300}
                />
                <Counter>{notes.length}/300</Counter>
            </EditRow3>
        </EditContainer>
    );
};

InfoEdit.propTypes = {
    data: PropTypes.object,
    stopEdit: PropTypes.func.isRequired
};

const SEARCH_PEOPLE_QUERY = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
            }
        }
    }
`;

const UPDATE_PERSON_MUTATION = gql`
    mutation UpdatePerson(
        $id: Int!
        $first_name: String
        $middle_name: String
        $last_name: String!
        $birth_date: String
        $birth_location: String
        $passed_date: String
        $passed_location: String
        $notes: String
    ) {
        updatePerson(
            updatePersonInput: {
                id: $id
                first_name: $first_name
                middle_name: $middle_name
                last_name: $last_name
                birth_date: $birth_date
                birth_location: $birth_location
                passed_date: $passed_date
                passed_location: $passed_location
                notes: $notes
            }
        ) {
            id
            first_name
            middle_name
            last_name
            birth_date
            birth_location
            passed_date
            passed_location
            notes
        }
    }
`;

const DELETE_PERSON_MUTATION = gql`
    mutation($id: Int!) {
        deletePerson(id: $id)
    }
`;

export default InfoEdit;
