import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    width: 100%;
    border: 1px solid black;
    margin: 1rem;
`;

const TitleText = styled.div`
    font-weight: bold;
`;

const BodyText = styled.div`
    font-size: 1rem;
`;

const DateText = styled.div`
    font-size: 0.5rem;
`;

const NewsItem = ({ data: { title, text, createdAt } }) => {
    return (
        <Container>
            <TitleText>{title}</TitleText>
            <BodyText>{text}</BodyText>
            <DateText>{createdAt}</DateText>
        </Container>
    );
};

NewsItem.propTypes = {
    data: PropTypes.object.isRequired
};

export default NewsItem;
