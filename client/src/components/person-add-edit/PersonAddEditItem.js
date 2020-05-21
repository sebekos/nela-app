import React, { useState } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import SuccessButton from "../universal/SuccessButton";
import DangerButton from "../universal/DangerButton";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import PersonAvatarEdit from "./PersonAvatarEdit";
import DefaultAvatar from "../../img/defaultavatar.png";
import "rc-slider/assets/index.css";
import { TextField, TextareaAutosize } from "@material-ui/core";

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
    width: 100%;
    text-align: right;
    font-size: 0.7rem;
    color: blue;
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

const NewAvatarText = styled(SaveText)`
    color: #333;
`;

const SaveEditDeleteContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
`;

const ShowContainerAll = styled.div`
    text-align: center;
    position: relative;
`;

const ShowNameContainer = styled.div``;

const ShowDatesContainer = styled.div``;

const ShowNotesContainer = styled.div``;

const ShowContainer = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onEdit }) => {
    return (
        <ShowContainerAll>
            <EditText onClick={onEdit}>Edit Person</EditText>
            <ShowNameContainer>{[first_name, middle_name, last_name].filter((item) => item !== null).join(" ")}</ShowNameContainer>
            <ShowDatesContainer>{[birth_date, passed_date].filter((item) => item !== null).join(" - ")}</ShowDatesContainer>
            <ShowNotesContainer>{notes}</ShowNotesContainer>
        </ShowContainerAll>
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

const FamilyShowContainer = styled.div``;

const FamilyShow = ({ family_data }) => {
    return (
        <FamilyShowContainer>
            {family_data ? (
                Object.keys(family_data).map((family) => {
                    const familygroup = family_data[family].map((person) => {
                        return (
                            <p key={uuid()}>
                                {family} - {person.first_name} {person.last_name}
                            </p>
                        );
                    });
                    return familygroup;
                })
            ) : (
                <p>No Family Members</p>
            )}
        </FamilyShowContainer>
    );
};

FamilyShow.propTypes = {
    family_data: PropTypes.object
};

const EditContainer = styled.div`
    position: relative;
`;

const EditRow1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0.5rem 0 1rem;
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

const Edit = ({ first_name, middle_name, last_name, birth_date, passed_date, notes, onSave, onChange, onEdit, onDelete }) => {
    return (
        <EditContainer>
            <SaveEditDeleteContainer>
                <SaveText onClick={onSave}>Save</SaveText>
                <CancelText onClick={onEdit}>Cancel</CancelText>
                <DeleteText onClick={onDelete}>Delete</DeleteText>
            </SaveEditDeleteContainer>
            <EditRow1>
                <TextField name="first_name" onChange={onChange} label="First name" variant="filled" value={first_name} />
                <TextField name="middle_name" onChange={onChange} label="Middle name" variant="filled" value={middle_name} />
                <TextField name="last_name" onChange={onChange} label="Last name" variant="filled" value={last_name} />
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
            </EditRow2>
            <EditRow3>
                <TextareaAutosize
                    autoComplete="off"
                    placeholder="Notes"
                    name="notes"
                    onChange={onChange}
                    value={notes}
                    type="text"
                    rowsMin={3}
                />
            </EditRow3>
        </EditContainer>
    );
};

Edit.propTypes = {
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

const FamilyEditContainer = styled.div``;

const Form = styled(GenForm)`
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding: 0.5rem;
`;

const PeopleItemContainer = styled.div`
    width: fit-content;
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
    width: fit-content;
    margin: 0.2rem 0;
`;

const FamilyEdit = ({ person_key, family_data }) => {
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
    family_data: PropTypes.object
};

const AvatarEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: auto;
`;

const AvatarImage = styled.img`
    max-width: 150px;
`;

const AvatarEdit = ({ person_key, link }) => {
    const [showUpload, setShowUpload] = useState(false);
    const newUpload = () => {
        setShowUpload(!showUpload);
    };
    return (
        <AvatarEditContainer>
            {showUpload ? (
                <PersonAvatarEdit person_key={person_key} setShowUpload={setShowUpload} />
            ) : (
                <AvatarImage src={link ? `/images/avatars/${link}?${new Date().getTime()}` : DefaultAvatar} alt="avatar" />
            )}
            <NewAvatarText onClick={newUpload}>New Avatar</NewAvatarText>
        </AvatarEditContainer>
    );
};

AvatarEdit.propTypes = {
    person_key: PropTypes.number,
    link: PropTypes.string
};

const ChangeAvatarContainer = styled.div`
    font-size: 0.7rem;
    color: blue;
    cursor: pointer;
    text-align: center;
`;

const AvatarShow = ({ link, onAvatarEdit }) => {
    return (
        <div>
            <AvatarImage src={link ? `/images/avatars/${link}?${new Date().getTime()}` : DefaultAvatar} alt="avatar" />
            <ChangeAvatarContainer onClick={onAvatarEdit}>Change Avatar</ChangeAvatarContainer>
        </div>
    );
};

AvatarShow.propTypes = {
    link: PropTypes.string,
    onAvatarEdit: PropTypes.func.isRequired
};

const AddEditShow = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;

const Item = ({ data }) => {
    const { data: relationsData } = useQuery(RELATIONS_QUERY, {
        variables: { id: data.id }
    });

    const [updatePerson] = useMutation(UPDATE_PERSON_MUTATION, {
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person updated");
            setEdit(false);
        }
    });

    const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
        refetchQueries: [{ query: PEOPLE_QUERY }],
        onError: (errors) => console.log(errors),
        onCompleted: () => {
            toast.success("Person deleted");
            setEdit(false);
        }
    });

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        id: data.id ? data.id : 0,
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
        updatePerson({ variables: { id: parseInt(data.id), first_name, middle_name, last_name, birth_date, passed_date, notes } });
    };

    const onDelete = () => {
        deletePerson({ variables: { id: parseInt(data.id) } });
    };

    const onAvatarEdit = () => {
        console.log("avataredit");
    };

    return (
        <Container>
            {edit ? (
                <>
                    {/* <AvatarEdit person_key={data.id} link={data.link_photo} /> */}
                    <Edit
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
                    {/* <FamilyEdit person_key={data.id} family_data={relationsData} /> */}
                </>
            ) : null}
            {!edit ? (
                <AddEditShow>
                    <AvatarShow link={data.link_photo} onAvatarEdit={onAvatarEdit} />
                    <ShowContainer
                        first_name={first_name}
                        middle_name={middle_name}
                        last_name={last_name}
                        birth_date={birth_date}
                        passed_date={passed_date}
                        notes={notes}
                        onEdit={onEdit}
                    />
                    {/* <FamilyShow family_data={relationsData} /> */}
                </AddEditShow>
            ) : null}
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

const UPDATE_PERSON_MUTATION = gql`
    mutation UpdatePerson(
        $id: Int!
        $first_name: String
        $middle_name: String
        $last_name: String!
        $birth_date: String
        $passed_date: String
        $notes: String
    ) {
        updatePerson(
            updatePersonInput: {
                id: $id
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

const DELETE_PERSON_MUTATION = gql`
    mutation($id: Int!) {
        deletePerson(id: $id)
    }
`;

const PEOPLE_QUERY = gql`
    {
        people {
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

export default Item;
