import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import NewsCard from "../../universal/NewsCard";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";

const ArrowLeft = <div className="arrow-prev">{"<"}</div>;
const ArrowRight = <div className="arrow-next">{">"}</div>;

const MenuItem = ({ text, title, createdAt }) => {
    return (
        <NewsCard>
            <div>{title}</div>
            <div>{text}</div>
            <div>{createdAt}</div>
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
    return <ScrollMenu wheel={false} data={menuItems} arrowLeft={ArrowLeft} arrowRight={ArrowRight} />;
};

ScrollCards.propTypes = {
    data: PropTypes.array
};

export default ScrollCards;
