import React from "react";
import styled from "styled-components";
import DefaultAvatar from "../../../img/defaultavatar.png";
import PropTypes from "prop-types";

const AvatarImage = styled.img`
    max-width: 150px;
`;

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

export default AvatarShow;
