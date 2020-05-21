import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";

const FamilyShowContainer = styled.div``;

const EditContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
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

const FamilyShow = ({ family_data, onFamilyEdit }) => {
    return (
        <FamilyShowContainer>
            <EditContainer>
                <EditText onClick={onFamilyEdit}>Edit Family</EditText>
            </EditContainer>
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
    family_data: PropTypes.object,
    onFamilyEdit: PropTypes.func.isRequired
};

export default FamilyShow;
