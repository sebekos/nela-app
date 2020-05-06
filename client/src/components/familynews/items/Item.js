import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../../utils/timeFormat";

const Container = styled.div`
    width: 500px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const BodyText = styled.div`
    font-size: 1rem;
`;

const DateText = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;

const Item = ({ data: { text, createdAt } }) => {
    return (
        <Container>
            <BodyText>{text}</BodyText>
            <DateText>{timeFormat(createdAt / 1000)}</DateText>
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

export default Item;
