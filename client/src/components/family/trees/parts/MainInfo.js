import React from "react";
import styled from "styled-components";
import DefaultAvatar from "../../../../img/defaultavatar.png";
import PropTypes from "prop-types";
import moment from "moment";

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 350px;
    width: max-content;
    margin: 3rem auto;

    box-shadow: 1px 1px 3px 2px #ccc;
`;

const ImageContainer = styled.div`
    max-height: 250px;
`;

const Image = styled.img`
    background-color: black;
`;

const TextInfoContainer = styled.div`
    margin: 0 0.5rem 0 1rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    justify-items: center;
`;

const TextInfoTitleContainer = styled.div`
    text-align: center;
    width: max-content;
    margin: auto;
`;

const TextInfoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const TextInfoNotes = styled.div``;

const TextInfoDatesContainer = styled.div``;

const Title = (props) => {
    const title = Object.keys(props)
        .map((prop) => {
            if (props[prop] !== null) {
                return props[prop];
            }
            return null;
        })
        .join(" ");
    return (
        <TextInfoTitleContainer>
            <TextInfoTitle>{title}</TextInfoTitle>
        </TextInfoTitleContainer>
    );
};

const TextInfoDates = ({ birth_date, passed_date }) => {
    let date = "";
    if (birth_date && !passed_date) {
        date = moment(birth_date, "YYYY-MM-DD").format("LL");
    } else if (birth_date && passed_date) {
        date = `${moment(birth_date, "YYYY-MM-DD").format("LL")} - ${moment(passed_date, "YYYY-MM-DD").format("LL")}`;
    } else {
        date = "No data";
    }
    return <TextInfoDatesContainer>{date}</TextInfoDatesContainer>;
};

TextInfoDates.propTypes = {
    birth_date: PropTypes.string,
    passed_date: PropTypes.string
};

const Main = ({ data }) => {
    return (
        <MainContainer>
            <ImageContainer>
                <Image src={data.link_photo ? `/images/avatars/${data.link_photo}` : DefaultAvatar} alt="avatar" />
            </ImageContainer>
            <TextInfoContainer>
                <Title first_name={data.first_name} middle_name={data.middle_name} last_name={data.last_name} />
                <TextInfoNotes>{data.notes ? data.notes : "No info"}</TextInfoNotes>
                <TextInfoDates birth_date={data.birth_date} passed_date={data.passed_date} />
            </TextInfoContainer>
        </MainContainer>
    );
};

const MainInfo = ({ data }) => {
    return <Main data={data} />;
};

export default MainInfo;
