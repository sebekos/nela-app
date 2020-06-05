import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    text-align: center;
    position: relative;
    grid-area: info;
    width: 634px;
`;

const ShowDatesContainer = styled.div``;

const BirthLocationContainer = styled.div``;

const ShowNotesContainer = styled.div`
    overflow-wrap: break-word;
    padding: 0.25rem;
    max-width: 634px;
`;

const EditContainer = styled.div`
    display: flex;
    margin: 0 0 0 auto;
    width: fit-content;
`;

const EditText = styled.div`
    padding: 0 0.3rem 0.3rem;
    font-size: 0.7rem;
    text-align: right;
    cursor: pointer;
    width: fit-content;
    color: blue;
`;

const InfoShow = ({ data: { birth_date, birth_location, passed_date, notes }, onInfoEdit }) => {
    return (
        <Container>
            <EditContainer>
                <EditText onClick={onInfoEdit}>Edit Info</EditText>
            </EditContainer>
            <ShowDatesContainer>{[birth_date, passed_date].filter((item) => item !== null).join(" - ")}</ShowDatesContainer>
            {birth_location && <BirthLocationContainer>{birth_location}</BirthLocationContainer>}
            <ShowNotesContainer>{notes ? notes : "No Info"}</ShowNotesContainer>
        </Container>
    );
};

InfoShow.propTypes = {
    data: PropTypes.object,
    onInfoEdit: PropTypes.func.isRequired
};

export default InfoShow;
