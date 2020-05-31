import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";

const FamilyShowContainer = styled.div`
    grid-area: family;
    border-top: 1px solid lightgrey;
    margin-top: 1rem;
`;

const EditContainer = styled.div`
    display: flex;
    margin: 0.5rem 0 0 auto;
    width: fit-content;
`;

const EditText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    text-align: right;
    cursor: pointer;
    width: fit-content;
    color: blue;
`;

const RelationItemContainer = styled.div`
    border: 1px solid lightgrey;
    margin: 0.1rem auto;
    display: flex;
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

const RelationItem = ({ relation, first_name, last_name }) => {
    return (
        <RelationItemContainer>
            <FamilySpan>{RelationConversion[relation]}</FamilySpan>{" "}
            <FamilyName>
                {first_name} {last_name}
            </FamilyName>
        </RelationItemContainer>
    );
};

RelationItem.propTypes = {
    relation: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
};

const FamilyShow = ({ family_data, onFamilyEdit }) => {
    return (
        <FamilyShowContainer>
            <EditContainer>
                <EditText onClick={onFamilyEdit}>Edit Family</EditText>
            </EditContainer>
            {family_data ? (
                family_data.map((item) => {
                    const { relation, first_name, last_name } = item;
                    return <RelationItem key={uuid()} relation={relation} first_name={first_name} last_name={last_name} />;
                })
            ) : (
                <p>No Family Members</p>
            )}
        </FamilyShowContainer>
    );
};

FamilyShow.propTypes = {
    family_data: PropTypes.array,
    onFamilyEdit: PropTypes.func.isRequired
};

export default FamilyShow;
