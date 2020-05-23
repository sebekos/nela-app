import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
};

export default Loading;
