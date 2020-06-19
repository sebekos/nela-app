import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";
import styled from "styled-components";

const AlphaContainer = styled.div`
    display: flex;
    width: max-content;
    margin: 2rem auto;
`;

const AlphaKeys = ({ data }) => {
    return (
        <AlphaContainer>
            {data.map((char) => {
                return (
                    <p key={uuid()}>
                        {char.alpha} ({char.num})
                    </p>
                );
            })}
        </AlphaContainer>
    );
};

const AlphaSearch = () => {
    const { loading, data, error } = useQuery(ALPHA_SEARCH);
    return <div>{!loading && data && data.alphaSearch && <AlphaKeys data={data.alphaSearch} />}</div>;
};

const ALPHA_SEARCH = gql`
    {
        alphaSearch {
            alpha
            num
        }
    }
`;

export default AlphaSearch;
