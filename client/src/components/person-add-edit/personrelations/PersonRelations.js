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

export default PersonRelations;
