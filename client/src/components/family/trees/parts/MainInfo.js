import React from "react";
import styled from "styled-components";
import DefaultAvatar from "../../../../img/defaultavatar.png";

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 350px;
    width: max-content;
    margin: 3rem auto;
`;

const ImageContainer = styled.div``;

const Image = styled.img``;

const TextInfoContainer = styled.div`
    margin-left: 0.5rem;
    border: 1px solid grey;
    max-height: 250px;
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

const Main = ({ data }) => {
    return (
        <MainContainer>
            <ImageContainer>
                <Image src={data.link_photo ? `/images/avatars/${data.link_photo}` : DefaultAvatar} alt="avatar" />
            </ImageContainer>
            <TextInfoContainer>
                <Title first_name={data.first_name} middle_name={data.middle_name} last_name={data.last_name} />
                <TextInfoNotes>{data.notes}</TextInfoNotes>
                <TextInfoDatesContainer>
                    {data.birth_date} - {data.passed_date}
                </TextInfoDatesContainer>
            </TextInfoContainer>
        </MainContainer>
    );
};

const MainInfo = ({ data }) => {
    return <Main data={data} />;
};

export default MainInfo;
