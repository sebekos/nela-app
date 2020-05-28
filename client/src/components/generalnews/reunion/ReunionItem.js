import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../../utils/timeFormat";

const Container = styled.div`
    max-width: 1000px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto 0;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    background-color: white;
    opacity: 0.9;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
    white-space: pre-wrap;
`;

const DateText = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;

const Item = ({ data: { title, text, createdAt } }) => {
    return (
        <Container>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
            <DateText>{timeFormat(createdAt / 1000)}</DateText>
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

export default Item;
