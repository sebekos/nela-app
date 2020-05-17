import React, { useState } from "react";
import GenInput from "../universal/GenInput";
import GenTextArea from "../universal/GenTextArea";
import SuccessButton from "../universal/SuccessButton";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

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

const Add = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onChange, onAdd }) => {
    return (
        <AddContainer>
            <GenInput autoComplete="off" placeholder="First Name" name="first_name" onChange={onChange} value={first_name} type="text" />
            <GenInput autoComplete="off" placeholder="Middle Name" name="middle_name" onChange={onChange} value={middle_name} type="text" />
            <GenInput autoComplete="off" placeholder="Last Name" name="last_name" onChange={onChange} value={last_name} type="text" />
            <GenInput autoComplete="off" placeholder="Birth Date" name="birth_date" onChange={onChange} value={birth_date} type="date" />
            <GenInput autoComplete="off" placeholder="Passed Date" name="passed_date" onChange={onChange} value={passed_date} type="date" />
            <GenTextArea autoComplete="off" placeholder="Notes" name="notes" onChange={onChange} value={notes} type="text" />
            <SuccessButton onClick={onAdd}>Add</SuccessButton>
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
