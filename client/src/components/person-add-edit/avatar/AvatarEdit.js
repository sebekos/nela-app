import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AvatarEditor from "./AvatarEditor";

const AvatarEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
`;

const CancelContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
`;

const CancelText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    text-align: right;
    cursor: pointer;
    width: fit-content;
    color: #333;
`;

const AvatarEdit = ({ person_key, stopEdit }) => {
    return (
        <AvatarEditContainer>
            <CancelContainer>
                <CancelText onClick={stopEdit}>Cancel</CancelText>
            </CancelContainer>
            <AvatarEditor person_key={person_key} stopEdit={stopEdit} />
        </AvatarEditContainer>
    );
};

AvatarEdit.propTypes = {
    person_key: PropTypes.number,
    stopEdit: PropTypes.func.isRequired
};

export default AvatarEdit;
