import React from "react";
import styled from "styled-components";
import DangerButton from "../universal/DangerButton";

const Container = styled.div`
    display: block;
    margin: 1rem;
`;

const DeleteImg = styled.img`
    width: 200px;
`;

const DeleteButton = styled(DangerButton)`
    position: absolute;
    margin-left: -53px;
`;
const DeleteItem = ({ image, onDelete, galleryid, photoid }) => {
    return (
        <Container>
            <DeleteImg src={image} alt="" />
            <DeleteButton value={image} onClick={onDelete}>
                X
            </DeleteButton>
        </Container>
    );
};

export default DeleteItem;
