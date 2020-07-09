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
    object-fit: cover;
    width: 98px;
    height: 98px;
    background-color: lightgrey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ImageDiv = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    background-color: lightgrey;
`;

const RootImage = styled.img`
    object-fit: cover;
    width: 98px;
    height: 98px;
    background-color: lightgrey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid orange;
`;

const NameContainer = styled.div`
    text-align: center;
    color: #333;
`;

const FamilyNode = ({ node, isRoot, style }) => {
    const currName = node.first_name ? node.first_name : node.last_name;
    return (
        <Container style={style}>
            <InfoContainer>
                <ImageDiv>
                    {isRoot ? <RootImage src={node.link_photo ? `${node.link_photo}` : DefaultAvatar} /> : null}
                    {!isRoot ? <Image src={node.link_photo ? `${node.link_photo}` : DefaultAvatar} /> : null}
                </ImageDiv>
                <NameContainer>{currName}</NameContainer>
            </InfoContainer>
        </Container>
    );
};

export default FamilyNode;
