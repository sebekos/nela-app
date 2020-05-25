import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import PropTypes from "prop-types";
import styled from "styled-components";
import timeFormat from "../../../utils/timeFormat";
import { uuid } from "uuidv4";

const ArrowLeft = <div className="arrow-prev">{"<"}</div>;
const ArrowRight = <div className="arrow-next">{">"}</div>;

const NewsCard = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 350px;
    height: 275px;
    margin: 0.25rem;
    padding: 0.25rem;
    overflow: hidden;
    font-size: 0.9rem;
    color: #333;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    word-break: break-all;
    background-color: white;
    opacity: 0.9;
`;

const Title = styled.div`
    text-align: center;
    font-weight: bold;
    margin-bottom: 0.25rem;
`;

const Date = styled.div`
    font-size: 0.7rem;
    text-align: right;
`;
const MenuItem = ({ text, title, createdAt }) => {
    return (
        <NewsCard>
            <Title>{title}</Title>
            <div>{text}</div>
            <Date>{timeFormat(createdAt)}</Date>
        </NewsCard>
    );
};

const Menu = (list) =>
    list.map((el) => {
        const { title, text, createdAt } = el;
        return <MenuItem text={text} title={title} createdAt={createdAt} key={uuid()} />;
    });

const ScrollCards = ({ data }) => {
    const menuItems = Menu(data);
    return <ScrollMenu alignCenter={false} wheel={false} data={menuItems} arrowLeft={ArrowLeft} arrowRight={ArrowRight} />;
};

ScrollCards.propTypes = {
    data: PropTypes.array
};

export default ScrollCards;
