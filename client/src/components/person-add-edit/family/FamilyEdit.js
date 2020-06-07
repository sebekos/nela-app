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
import { CircularProgress } from "@material-ui/core";

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

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

const RelationItem = ({ tid, relation, first_name, last_name, info_date, onRemove }) => {
    const infoDate = info_date ? ` ślub: ${info_date}` : null;
    return (
        <RelationItemContainer>
            <FamilySpan>{RelationConversion[relation]}</FamilySpan>
            <FamilyName>
                {first_name} {last_name}
                {infoDate}
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
            {data.map((item) => {
                const { tid, first_name, last_name, relation, info_date } = item;
                return (
                    <RelationItem
                        tid={tid}
                        key={uuid()}
                        relation={relation}
                        first_name={first_name}
                        last_name={last_name}
                        info_date={info_date}
                        onRemove={removeFuncs[relation]}
                    />
                );
            })}
        </>
    );
};

const ButtonsContainer = styled.div`
    align-self: flex-end;
    width: max-content;
`;

const PeopleItem = ({ id, first_name, last_name, addParent, addSibling, addChild, addSpouse }) => {
    const [weddate, setWeddate] = useState("");

    const onWedChange = (e) => {
        setWeddate(e.target.value);
    };

    const onSpouse = () => {
        addSpouse(id, weddate);
    };

    return (
        <PeopleItemContainer>
            <PersonText>
                {first_name} {last_name}
            </PersonText>
            <ButtonsContainer value={id}>
                <AddParent onClick={addParent}>Parent</AddParent>
                <AddSibling onClick={addSibling}>Sibling</AddSibling>
                <AddChild onClick={addChild}>Child</AddChild>
                <AddSpouse onClick={onSpouse}>Spouse</AddSpouse>
                <input onChange={onWedChange} name="weddate" type="date" value={weddate}></input>
            </ButtonsContainer>
        </PeopleItemContainer>
    );
};

const PeopleItems = ({ data, addParent, addSibling, addChild, addSpouse }) => {
    return (
        <>
            {data.map((person) => {
                const { id, first_name, last_name } = person;
                return (
                    <PeopleItem
                        key={uuid()}
                        id={id}
                        first_name={first_name}
                        last_name={last_name}
                        addParent={addParent}
                        addSibling={addSibling}
                        addChild={addChild}
                        addSpouse={addSpouse}
                    />
                );
            })}
        </>
    );
};

const SearchInput = styled(GenInput)`
    margin: auto;
    width: 634px;
`;

const FamilyEdit = ({ person_key, family_data, stopEdit }) => {
    const [search, setSearch] = useState("");
    const [curLoading, setCurLoading] = useState(false);

    const onChange = (e) => setSearch(e.target.value);

    const [searchPeople, { loading, data }] = useLazyQuery(SEARCH_PEOPLE_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: () => setCurLoading(false)
    });

    const [addParentMutation] = useMutation(ADD_PARENT_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Parent added");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeParentMutation] = useMutation(REMOVE_PARENT_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }],
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Parent removed");
        }
    });

    const [addChildMutation] = useMutation(ADD_CHILD_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Child added");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeChildMutation] = useMutation(REMOVE_CHILD_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Child removed");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSiblingMutation] = useMutation(ADD_SIBLING_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Sibling added");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeSiblingMutation] = useMutation(REMOVE_SIBLING_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Sibling removed");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [addSpouseMutation] = useMutation(ADD_SPOUSE_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Spouse added");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const [removeSpouseMutation] = useMutation(REMOVE_SPOUSE_MUTATION, {
        onError: (errors) => {
            setCurLoading(false);
            console.log(errors);
        },
        onCompleted: () => {
            setCurLoading(false);
            toast.success("Spouse removed");
        },
        refetchQueries: [{ query: RELATIONS_QUERY, variables: { id: person_key } }]
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setCurLoading(true);
        searchPeople({ variables: { search } });
    };
    const addParent = (e) => {
        let parent_key = parseInt(e.target.parentElement.getAttribute("value"), 10);
        setCurLoading(true);
        addParentMutation({ variables: { person_key, parent_key } });
    };

    const addSibling = (e) => {
        let sibling_key = parseInt(e.target.parentElement.getAttribute("value"), 10);
        setCurLoading(true);
        addSiblingMutation({ variables: { person_key, sibling_key } });
    };

    const addChild = (e) => {
        let child_key = parseInt(e.target.parentElement.getAttribute("value"), 10);
        setCurLoading(true);
        addChildMutation({ variables: { person_key, child_key } });
    };

    const addSpouse = (spouse_key, wed_date) => {
        setCurLoading(true);
        addSpouseMutation({ variables: { person_key, spouse_key, wed_date } });
    };

    const removeParent = (e) => {
        setCurLoading(true);
        removeParentMutation({ variables: { id: parseInt(e.target.id, 10) } });
    };

    const removeChild = (e) => {
        setCurLoading(true);
        removeChildMutation({ variables: { id: parseInt(e.target.id, 10) } });
    };

    const removeSibling = (e) => {
        setCurLoading(true);
        removeSiblingMutation({ variables: { id: parseInt(e.target.id, 10) } });
    };

    const removeSpouse = (e) => {
        setCurLoading(true);
        removeSpouseMutation({ variables: { id: parseInt(e.target.id, 10) } });
    };

    return (
        <FamilyEditContainer>
            <CircularContainer>{curLoading ? <CircularProgress /> : null}</CircularContainer>
            <SaveEditDeleteContainer>
                <CancelText onClick={stopEdit}>Done</CancelText>
            </SaveEditDeleteContainer>
            <Form onSubmit={onSubmit}>
                <SearchInput placeholder="Search people" onChange={onChange} type="text" value={search} />
            </Form>
            {!loading && data && data.familySearchPeople && data.familySearchPeople.results.length > 0 ? (
                <PeopleItems
                    data={data.familySearchPeople.results}
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
    family_data: PropTypes.array,
    stopEdit: PropTypes.func.isRequired
};

const SEARCH_PEOPLE_QUERY = gql`
    query FamilySearchPeople($search: String!) {
        familySearchPeople(search: $search) {
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
    mutation AddSpouse($person_key: Int!, $spouse_key: Int!, $wed_date: String) {
        addSpouse(spouseInput: { person_key: $person_key, spouse_key: $spouse_key, wed_date: $wed_date })
    }
`;

const REMOVE_SPOUSE_MUTATION = gql`
    mutation DeleteSpouse($id: Int!) {
        deleteSpouse(id: $id)
    }
`;

const RELATIONS_QUERY = gql`
    query Relations($id: Int!) {
        relations(filter: $id) {
            tid
            id
            relation
            info_date
            first_name
            middle_name
            last_name
            notes
        }
    }
`;

export default FamilyEdit;
