import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import GenForm from "../../universal/GenForm";
import SuccessButton from "../../universal/SuccessButton";
import DangerButton from "../../universal/DangerButton";
import GenInput from "../../universal/GenInput";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";

const FamilyEditContainer = styled.div``;

const SaveEditDeleteContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
`;

const CancelText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    color: blue;
    text-align: right;
    cursor: pointer;
    width: fit-content;
`;

const Form = styled(GenForm)`
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding: 0.5rem;
`;

const PeopleItemContainer = styled.div`
    width: max-content;
    margin: 0.2rem auto;
`;

const PersonText = styled.span`
    margin-right: 1rem;
`;

const AddParent = styled(SuccessButton)`
    margin-right: 0.2rem;
`;

const AddSibling = styled(SuccessButton)`
    margin-right: 0.2rem;
`;

const AddChild = styled(SuccessButton)`
    margin-right: 0.2rem;
`;

const AddSpouse = styled(SuccessButton)``;

const RemoveButton = styled(DangerButton)`
    margin-left: 0.5rem;
`;

const RemoveItemContainer = styled.div`
    width: max-content;
    margin: 0.2rem auto;
`;

const FamilyEdit = ({ person_key, family_data, stopEdit }) => {
    const [searchPeople, { loading, data }] = useLazyQuery(SEARCH_PEOPLE_QUERY);

    const [addParentMutation] = useMutation(ADD_PARENT_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Parent added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addChildMutation] = useMutation(ADD_CHILD_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Child added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSiblingMutation] = useMutation(ADD_SIBLING_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Sibling added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSpouseMutation] = useMutation(ADD_SPOUSE_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Spouse added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [search, setSearch] = useState("");

    const onChange = (e) => setSearch(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        searchPeople({ variables: { search } });
    };
    const addParent = (e) => {
        let parent_key = parseInt(e.target.parentElement.getAttribute("value"));
        addParentMutation({ variables: { person_key, parent_key } });
    };

    const addSibling = (e) => {
        let sibling_key = parseInt(e.target.parentElement.getAttribute("value"));
        addSiblingMutation({ variables: { person_key, sibling_key } });
    };

    const addChild = (e) => {
        let child_key = parseInt(e.target.parentElement.getAttribute("value"));
        addChildMutation({ variables: { person_key, child_key } });
    };

    const addSpouse = (e) => {
        let spouse_key = parseInt(e.target.parentElement.getAttribute("value"));
        addSpouseMutation({ variables: { person_key, spouse_key } });
    };

    const onRemove = () => {
        console.log("Relation removed");
    };

    return (
        <FamilyEditContainer>
            <SaveEditDeleteContainer>
                <CancelText onClick={stopEdit}>Save</CancelText>
            </SaveEditDeleteContainer>
            <Form onSubmit={onSubmit}>
                <GenInput onChange={onChange} type="text" value={search} />
            </Form>
            {!loading && data && data.searchPeople && data.searchPeople.results.length > 0
                ? data.searchPeople.results.map((person) => {
                      return (
                          <PeopleItemContainer key={uuid()} value={person.id}>
                              <PersonText>
                                  {person.first_name} {person.last_name}
                              </PersonText>
                              <AddParent onClick={addParent}>Parent</AddParent>
                              <AddSibling onClick={addSibling}>Sibling</AddSibling>
                              <AddChild onClick={addChild}>Child</AddChild>
                              <AddSpouse onClick={addSpouse}>Spouse</AddSpouse>
                          </PeopleItemContainer>
                      );
                  })
                : null}
            {family_data ? (
                Object.keys(family_data).map((family) => {
                    const familygroup = family_data[family].map((person) => {
                        return (
                            <RemoveItemContainer key={uuid()}>
                                {family} - {person.first_name} {person.last_name}
                                <RemoveButton onClick={onRemove}>Remove</RemoveButton>
                            </RemoveItemContainer>
                        );
                    });
                    return familygroup;
                })
            ) : (
                <p>No Family Members</p>
            )}
        </FamilyEditContainer>
    );
};

FamilyEdit.propTypes = {
    person_key: PropTypes.number,
    family_data: PropTypes.object,
    stopEdit: PropTypes.func.isRequired
};

const SEARCH_PEOPLE_QUERY = gql`
    query SearchPeople($search: String!) {
        searchPeople(search: $search) {
            id
            results {
                id
                first_name
                middle_name
                last_name
            }
        }
    }
`;

const ADD_PARENT_MUTATION = gql`
    mutation AddParent($person_key: Int!, $parent_key: Int!) {
        addParent(parentInput: { person_key: $person_key, parent_key: $parent_key })
    }
`;

const ADD_CHILD_MUTATION = gql`
    mutation AddChild($person_key: Int!, $child_key: Int!) {
        addChild(childInput: { person_key: $person_key, child_key: $child_key })
    }
`;

const ADD_SIBLING_MUTATION = gql`
    mutation AddSibling($person_key: Int!, $sibling_key: Int!) {
        addSibling(siblingInput: { person_key: $person_key, sibling_key: $sibling_key })
    }
`;

const ADD_SPOUSE_MUTATION = gql`
    mutation AddSpouse($person_key: Int!, $spouse_key: Int!) {
        addSpouse(spouseInput: { person_key: $person_key, spouse_key: $spouse_key })
    }
`;

const RELATIONS_QUERY = gql`
    query Relations($id: Int!) {
        children(filter: $id) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        parents(filter: $id) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        siblings(filter: $id) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        spouses(filter: $id) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
    }
`;

export default FamilyEdit;
