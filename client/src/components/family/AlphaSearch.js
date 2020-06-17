import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";

const AlphaKeys = ({ data }) => {
    return data.map((char) => {
        return (
            <p key={uuid()}>
                {char.alpha} ({char.num})
            </p>
        );
    });
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
