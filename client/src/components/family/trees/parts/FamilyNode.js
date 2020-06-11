import React from "react";
import styled from "styled-components";
import DefaultAvatar from "../../../../img/defaultavatar.png";

const Container = styled.div`
    position: absolute;
    display: flex;
    padding: 10px;
`;

const InfoContainer = styled.div`
    position: relative;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    background-color: lightgrey;
`;

const RootImage = styled.img`
    width: 100px;
    height: 100px;
    background-color: lightgrey;
    border: 3px solid orange;
`;

const NameContainer = styled.div`
    text-align: center;
    color: #333;
`;

const FamilyNode = ({ node, isRoot, style }) => {
    return (
        <Container style={style}>
            <InfoContainer>
                {isRoot ? <RootImage src={node.link_photo ? `/images/avatars/${node.link_photo}` : DefaultAvatar} /> : null}
                {!isRoot ? <Image src={node.link_photo ? `/images/avatars/${node.link_photo}` : DefaultAvatar} /> : null}
                <NameContainer>{node.first_name}</NameContainer>
            </InfoContainer>
        </Container>
    );
};

export default FamilyNode;
