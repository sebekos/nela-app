import React from "react";
import styled from "styled-components";
import PersonAdd from "./PersonAdd";
import PersonEdit from "./PersonEdit";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
`;

const AddEdit = ({ value, index }) => {
    if (value !== index) return null;
    return (
        <Container>
            <PersonAdd />
            <PersonEdit />
        </Container>
    );
};

export default AddEdit;
