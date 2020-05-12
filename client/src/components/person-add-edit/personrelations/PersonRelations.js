import React from "react";
import styled from "styled-components";
import ParentRelation from "./ParentRelation";
import ChildrenRelation from "./ChildrenRelation";
import SpouseRelation from "./SpouseRelation";
import SiblingRelation from "./SiblingRelation";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const PersonRelationsContainer = styled.div`
    font-weight: bold;
`;

const PersonRelations = ({ edit, id }) => {
    const { data, loading } = useQuery(PERSON_RELATIONS_QUERY);
    console.log(data);
    return (
        <PersonRelationsContainer>
            <ParentRelation edit={edit} />
            <SiblingRelation edit={edit} />
            <SpouseRelation edit={edit} />
            <ChildrenRelation edit={edit} />
        </PersonRelationsContainer>
    );
};

PersonRelations.propTypes = {
    edit: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

const PERSON_RELATIONS_QUERY = gql`
    query PersonData($id: Int!) {
        person(filter: 1) {
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
    }
`;

export default PersonRelations;
