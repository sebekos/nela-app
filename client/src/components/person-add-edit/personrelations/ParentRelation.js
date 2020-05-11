import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const Container = styled.div`
    margin: auto;
`;

const ShowContainer = styled.div``;

const Show = () => {
    return <ShowContainer>SHOWING</ShowContainer>;
};

const EditContainer = styled.div``;

const Edit = () => {
    return <EditContainer>EDITING</EditContainer>;
};

const ParentRelation = ({ edit }) => {
    return <Container>{edit ? <Edit /> : <Show />}</Container>;
};

export default ParentRelation;
