import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import timeFormat from "../../utils/timeFormat";

const Container = styled.div`
    max-width: 800px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
`;

const DateText = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;

const NewsItem = ({ data: { title, text, createdAt } }) => {
    return (
        <Container>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
            <DateText>{timeFormat(createdAt / 1000)}</DateText>
        </Container>
    );
};

NewsItem.propTypes = {
    data: PropTypes.object.isRequired
};

export default NewsItem;
