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
    width: 634px;
    margin: 0.2rem auto;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgrey;
`;

const PersonText = styled.span`
    margin: 0 1rem;
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
    justify-self: flex-end;
`;

const RelationItemContainer = styled.div`
    border: 1px solid lightgrey;
    margin: 0.1rem auto;
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    width: 634px;
`;

const FamilySpan = styled.div`
    padding: 0 1rem;
    background-color: lightgrey;
    width: 100px;
`;

const FamilyName = styled.div`
    margin: 0 0.5rem;
`;

const RelationConversion = {
    parents: "Parent",
    siblings: "Sibling",
    spouses: "Spouse",
    children: "Child"
};

const RelationItem = ({ tid, family, first_name, last_name, onRemove }) => {
    return (
        <RelationItemContainer>
            <FamilySpan>{RelationConversion[family]}</FamilySpan>
            <FamilyName>
                {first_name} {last_name}
            </FamilyName>
            <RemoveButton onClick={onRemove} id={tid}>
                Remove
            </RemoveButton>
        </RelationItemContainer>
    );
};

const Remove = ({ data, removeParent, removeChild, removeSibling, removeSpouse }) => {
    const removeFuncs = {
        parents: removeParent,
        siblings: removeSibling,
        spouses: removeSpouse,
        children: removeChild
    };
    return (
        <>
            {Object.keys(data).map((family) => {
                const familygroup = data[family].map((person) => {
                    const { tid, first_name, last_name } = person;
                    return (
                        <RelationItem
                            tid={tid}
                            key={uuid()}
                            family={family}
                            first_name={first_name}
                            last_name={last_name}
                            onRemove={removeFuncs[family]}
                        />
                    );
                });
                return familygroup;
            })}
        </>
    );
};

const ButtonsContainer = styled.div`
    align-self: flex-end;
    width: max-content;
`;

const PeopleItems = ({ data, addParent, addSibling, addChild, addSpouse }) => {
    const people = data.map((person) => {
        return (
            <PeopleItemContainer key={uuid()}>
                <PersonText>
                    {person.first_name} {person.last_name}
                </PersonText>
                <ButtonsContainer value={person.id}>
                    <AddParent onClick={addParent}>Parent</AddParent>
                    <AddSibling onClick={addSibling}>Sibling</AddSibling>
                    <AddChild onClick={addChild}>Child</AddChild>
                    <AddSpouse onClick={addSpouse}>Spouse</AddSpouse>
                </ButtonsContainer>
            </PeopleItemContainer>
        );
    });
    return people;
};

const FamilyEdit = ({ person_key, family_data, stopEdit }) => {
    const [searchPeople, { loading, data }] = useLazyQuery(SEARCH_PEOPLE_QUERY);

    const [addParentMutation] = useMutation(ADD_PARENT_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Parent added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeParentMutation] = useMutation(REMOVE_PARENT_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Parent removed"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addChildMutation] = useMutation(ADD_CHILD_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Child added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeChildMutation] = useMutation(REMOVE_CHILD_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Child removed"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSiblingMutation] = useMutation(ADD_SIBLING_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Sibling added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeSiblingMutation] = useMutation(REMOVE_SIBLING_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Sibling removed"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSpouseMutation] = useMutation(ADD_SPOUSE_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Spouse added"),
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeSpouseMutation] = useMutation(REMOVE_SPOUSE_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => toast.success("Spouse removed"),
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
        console.log({ variables: { person_key, sibling_key } });
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

    const removeParent = (e) => removeParentMutation({ variables: { id: parseInt(e.target.id) } });
    const removeChild = (e) => removeChildMutation({ variables: { id: parseInt(e.target.id) } });
    const removeSibling = (e) => removeSiblingMutation({ variables: { id: parseInt(e.target.id) } });
    const removeSpouse = (e) => removeSpouseMutation({ variables: { id: parseInt(e.target.id) } });

    return (
        <FamilyEditContainer>
            <SaveEditDeleteContainer>
                <CancelText onClick={stopEdit}>Save</CancelText>
            </SaveEditDeleteContainer>
            <Form onSubmit={onSubmit}>
                <GenInput onChange={onChange} type="text" value={search} />
            </Form>
            {!loading && data && data.searchPeople && data.searchPeople.results.length > 0 ? (
                <PeopleItems
                    data={data.searchPeople.results}
                    addParent={addParent}
                    addSibling={addSibling}
                    addChild={addChild}
                    addSpouse={addSpouse}
                />
            ) : null}
            {family_data ? (
                <Remove
                    data={family_data}
                    removeParent={removeParent}
                    removeChild={removeChild}
                    removeSibling={removeSibling}
                    removeSpouse={removeSpouse}
                />
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

const REMOVE_PARENT_MUTATION = gql`
    mutation DeleteParent($id: Int!) {
        deleteParent(id: $id)
    }
`;

const ADD_CHILD_MUTATION = gql`
    mutation AddChild($person_key: Int!, $child_key: Int!) {
        addChild(childInput: { person_key: $person_key, child_key: $child_key })
    }
`;

const REMOVE_CHILD_MUTATION = gql`
    mutation DeleteChild($id: Int!) {
        deleteChild(id: $id)
    }
`;

const ADD_SIBLING_MUTATION = gql`
    mutation AddSibling($person_key: Int!, $sibling_key: Int!) {
        addSibling(siblingInput: { person_key: $person_key, sibling_key: $sibling_key })
    }
`;

const REMOVE_SIBLING_MUTATION = gql`
    mutation DeleteSibling($id: Int!) {
        deleteSibling(id: $id)
    }
`;

const ADD_SPOUSE_MUTATION = gql`
    mutation AddSpouse($person_key: Int!, $spouse_key: Int!) {
        addSpouse(spouseInput: { person_key: $person_key, spouse_key: $spouse_key })
    }
`;

const REMOVE_SPOUSE_MUTATION = gql`
    mutation DeleteSpouse($id: Int!) {
        deleteSpouse(id: $id)
    }
`;

const RELATIONS_QUERY = gql`
    query Relations($id: Int!) {
        children(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        parents(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        siblings(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        spouses(filter: $id) {
            tid
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
