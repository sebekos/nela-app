import React from "react";
import styled from "styled-components";
import DefaultAvatar from "../../../img/defaultavatar.png";
import PropTypes from "prop-types";

const Container = styled.div`
    grid-area: avatar;
    width: max-content;
`;

const AvatarImage = styled.img`
    object-fit: cover;
    width: 150px;
    height: 150px;
    background-color: lightgrey;
`;

const ChangeAvatarContainer = styled.div`
    font-size: 0.7rem;
    color: blue;
    cursor: pointer;
    text-align: center;
`;

const AvatarShow = ({ link, onAvatarEdit }) => {
    return (
        <Container>
            <AvatarImage src={link ? `${link}?t=${new Date().getTime()}` : DefaultAvatar} alt="avatar" />
            <ChangeAvatarContainer onClick={onAvatarEdit}>Zmień Obrazek</ChangeAvatarContainer>
        </Container>
    );
};

AvatarShow.propTypes = {
    link: PropTypes.string,
    onAvatarEdit: PropTypes.func.isRequired
};

export default AvatarShow;
