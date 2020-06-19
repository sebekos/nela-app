import React from "react";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: max-content;
    margin: auto;
`;

const AlphaContainer = styled.div`
    display: flex;
    width: max-content;
    margin: 2rem auto 1rem;
`;

const CountContainer = styled.div`
    margin: 0.5rem;
    cursor: pointer;
`;

const AlphaKeys = ({ data, onAlpha }) => {
    return (
        <AlphaContainer>
            {data.map((char) => {
                return (
                    <CountContainer key={uuid()} onClick={onAlpha} value={char.alpha}>
                        {char.alpha} ({char.num})
                    </CountContainer>
                );
            })}
        </AlphaContainer>
    );
};

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 1rem 0 0;
    position: relative;
    height: 70px;
`;

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularContainer>
                <CircularProgress />
            </CircularContainer>
        </LoadingContainer>
    );
};

const nameFix = (first_name, middle_name, last_name, birth_date) => {
    return [first_name, middle_name, last_name, birth_date].filter((item) => item !== null).join(" ");
};

const NameContainer = styled.div`
    color: #333;
    text-decoration: none;
`;

const ListItems = ({ alphaData }) => {
    return alphaData.map((item) => {
        const { id, first_name, middle_name, last_name, birth_date } = item;
        const name = nameFix(first_name, middle_name, last_name, birth_date);
        return (
            <Link style={{ textDecoration: "none" }} key={uuid()} to={`/Rodzina/${id}`}>
                <NameContainer>{name}</NameContainer>
            </Link>
        );
    });
};

const AlphaSearch = () => {
    const { loading, data } = useQuery(ALPHA_SEARCH);
    const [alphaList, { data: alphaData, loading: alphaLoading }] = useLazyQuery(ALPHA_LIST);
    const onAlpha = (e) => {
        alphaList({
            variables: {
                filter: e.target.getAttribute("value")
            }
        });
    };
    return (
        <Container>
            {!loading && data && data.alphaSearch && <AlphaKeys data={data.alphaSearch} onAlpha={onAlpha} />}
            {loading || alphaLoading ? <Loading /> : null}
            {!alphaLoading && alphaData && alphaData.alphaList.length > 0 ? <ListItems alphaData={alphaData.alphaList} /> : null}
        </Container>
    );
};

const ALPHA_SEARCH = gql`
    {
        alphaSearch {
            alpha
            num
        }
    }
`;

const ALPHA_LIST = gql`
    query AlphaList($filter: String!) {
        alphaList(filter: $filter) {
            id
            first_name
            middle_name
            last_name
            birth_date
        }
    }
`;

export default AlphaSearch;
