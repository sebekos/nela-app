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
    width: 700px;
`;

const FamilySpan = styled.div`
    padding: 0 1rem;
    background-color: lightgrey;
    width: 150px;
    text-align: center;
`;

const FamilyName = styled.div`
    margin: 0 0 0 1rem;
    white-space: nowrap;
`;

const RelationConversion = {
    parents: "Rodzic",
    siblings: "Rodzeństwo",
    spouses: "Małżonka",
    children: "Dzieci"
};

const RelationItem = ({ relation, first_name, last_name, info_date }) => {
    const infoDate = info_date ? ` ślub: ${info_date}` : null;
    return (
        <RelationItemContainer>
            <FamilySpan>{RelationConversion[relation]}</FamilySpan>{" "}
            <FamilyName>
                {first_name} {last_name}
                {infoDate}
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
                <EditText onClick={onFamilyEdit}>Edytuj Rodzinę</EditText>
            </EditContainer>
            {family_data ? (
                family_data.map((item) => {
                    const { relation, first_name, last_name, info_date } = item;
                    return (
                        <RelationItem
                            key={uuid()}
                            relation={relation}
                            first_name={first_name}
                            last_name={last_name}
                            info_date={info_date}
                        />
                    );
                })
            ) : (
                <p>brak rodziny</p>
            )}
        </FamilyShowContainer>
    );
};

FamilyShow.propTypes = {
    family_data: PropTypes.array,
    onFamilyEdit: PropTypes.func.isRequired
};

export default FamilyShow;
