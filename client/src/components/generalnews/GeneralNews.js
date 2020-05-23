import React from "react";
import styled from "styled-components";
import Reunion from "./reunion/Reunion";
import Loading from "../universal/Loading";
import ScrollCards from "./menu/ScrollCards";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
    max-width: 1300px;
    & > div:last-child {
        margin-bottom: 3rem;
    }
`;

const MediumTitle = styled.div`
    font-size: 2rem;
    color: #3e4444;
    padding: 2rem 0 0rem 3rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const SmallTitle = styled(MediumTitle)`
    padding: 0 0 0 5rem;
    font-size: 1rem;
`;

const GeneralNews = () => {
    const { data, loading, error } = useQuery(GENERAL_NEWS_QUERY);
    return (
        <Container>
            {loading ? <Loading /> : null}
            {!loading && !error ? (
                <>
                    <MediumTitle>Newsy</MediumTitle>
                    <ScrollCards data={data.news} />
                    <MediumTitle>Wiesci</MediumTitle>
                    <SmallTitle>Wydarzyło się</SmallTitle>
                    <ScrollCards data={data.familynews} />
                    <SmallTitle>Zabraklo miedzy nami</SmallTitle>
                    <ScrollCards data={data.familynews} />
                    <SmallTitle>Witamy w rodzinie</SmallTitle>
                    <ScrollCards data={data.familynews} />
                    <MediumTitle>Zjazdy</MediumTitle>
                    <Reunion data={data.reunion} />
                </>
            ) : null}
        </Container>
    );
};

const GENERAL_NEWS_QUERY = gql`
    {
        news {
            id
            title
            text
            createdAt
        }
        familynews {
            id
            type
            text
            createdAt
        }
        reunion {
            id
            title
            text
            createdAt
        }
    }
`;

export default GeneralNews;
