import React, { useState } from "react";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { TextField, TextareaAutosize } from "@material-ui/core";

const AddContainer = styled.div`
    position: relative;
    max-width: 800px;
    padding: 1rem;
    color: #333;
    margin: 1rem auto 0;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddRow1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0.5rem 0 1rem;
    & > div {
        margin: 0 0.5rem;
    }
`;

const AddRow2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    & > div {
        margin: 0 0.5rem;
    }
`;

const AddRow3 = styled.div`
    padding: 1rem 0.5rem 0.5rem;
    & > textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
    }
`;

const AddRow4 = styled.div`
    margin-left: 0.5rem;
`;

const Add = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onChange, onAdd }) => {
    return (
        <AddContainer>
            <AddRow1>
                <TextField name="first_name" onChange={onChange} label="First name" variant="filled" value={first_name} />
                <TextField name="middle_name" onChange={onChange} label="Middle name" variant="filled" value={middle_name} />
                <TextField name="last_name" onChange={onChange} label="Last name" variant="filled" value={last_name} />
            </AddRow1>
            <AddRow2>
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
            </AddRow2>
            <AddRow3>
                <TextareaAutosize
                    autoComplete="off"
                    placeholder="Notes"
                    name="notes"
                    onChange={onChange}
                    value={notes}
                    type="text"
                    rowsMin={3}
                />
            </AddRow3>
            <AddRow4>
                <SuccessButton onClick={onAdd}>Add</SuccessButton>
            </AddRow4>
        </AddContainer>
    );
};

Add.propTypes = {
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    last_name: PropTypes.string,
    birth_date: PropTypes.string,
    passed_date: PropTypes.string,
    notes: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

const PersonAdd = () => {
    const [addPerson] = useMutation(ADD_PERSON_QUERY, {
        refetchQueries: [{ query: PEOPLE_QUERY }],
        onError: (err) => console.log(err),
        onCompleted: () => {
            toast.success("Person added");
            setFormData({
                first_name: "",
                middle_name: "",
                last_name: "",
                birth_date: "",
                passed_date: "",
                notes: ""
            });
        }
    });

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        birth_date: "",
        passed_date: "",
        notes: ""
    });

    const { first_name, middle_name, last_name, birth_date, passed_date, notes } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onAdd = (e) => {
        e.preventDefault();
        addPerson({ variables: { first_name, middle_name, last_name, birth_date, passed_date, notes } });
    };

    return (
        <Add
            first_name={first_name}
            middle_name={middle_name}
            last_name={last_name}
            birth_date={birth_date}
            passed_date={passed_date}
            notes={notes}
            onChange={onChange}
            onAdd={onAdd}
        />
    );
};

const ADD_PERSON_QUERY = gql`
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

const PEOPLE_QUERY = gql`
    {
        people {
            id
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
            notes
        }
    }
`;

export default PersonAdd;
