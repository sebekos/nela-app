import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";
import { Link } from "react-router-dom";

const Container = styled.div`
    max-width: 350px;
    padding: 0;
    color: #333;
    margin: 1rem auto 0;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const TextContainer = styled.div`
    padding: 0.5rem 0.5rem 0.1rem;
`;

const TitleText = styled.div`
    font-weight: bold;
    text-align: center;
`;

const BodyText = styled.div`
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DateText = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;

const ImageContainer = styled.div`
    height: 200px;
    overflow: hidden;
    background-color: lightgrey;
`;

const ImageSrc = styled.img`
    width: 350px;
    object-fit: cover;
`;

const Image = ({ thumb_1 }) => {
    return (
        <ImageContainer>
            <ImageSrc src={thumb_1} alt="photo" />
        </ImageContainer>
    );
};

Image.propTypes = {
    thumb_1: PropTypes.string,
    id: PropTypes.number
};

const Item = ({ data: { id, title, text, createdAt, thumb_1 } }) => {
    return (
        <Container>
            <Link to={`/galeria/${id}`} style={{ textDecoration: "none", color: "#333" }}>
                <Image thumb_1={thumb_1} />
                <TextContainer>
                    <TitleText>{title}</TitleText>
                    <BodyText>{text}</BodyText>
                    <DateText>{timeFormat(createdAt / 1000)}</DateText>
                </TextContainer>
            </Link>
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

export default Item;
