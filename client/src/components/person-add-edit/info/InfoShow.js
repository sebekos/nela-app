import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    text-align: center;
    position: relative;
`;

const ShowNameContainer = styled.div``;

const ShowDatesContainer = styled.div``;

const ShowNotesContainer = styled.div``;

const EditText = styled.div`
    width: 100%;
    text-align: right;
    font-size: 0.7rem;
    color: blue;
    cursor: pointer;
`;

const InfoShow = ({ data: { first_name, middle_name, last_name, birth_date, passed_date, notes }, onInfoEdit }) => {
    return (
        <Container>
            <EditText onClick={onInfoEdit}>Edit Person</EditText>
            <ShowNameContainer>{[first_name, middle_name, last_name].filter((item) => item !== null).join(" ")}</ShowNameContainer>
            <ShowDatesContainer>{[birth_date, passed_date].filter((item) => item !== null).join(" - ")}</ShowDatesContainer>
            <ShowNotesContainer>{notes}</ShowNotesContainer>
        </Container>
    );
};

InfoShow.propTypes = {
    data: PropTypes.object,
    onInfoEdit: PropTypes.func.isRequired
};

export default InfoShow;
