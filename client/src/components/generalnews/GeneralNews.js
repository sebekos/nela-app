import React from "react";
import styled from "styled-components";
import Reunion from "./reunion/Reunion";
import Loading from "../universal/Loading";
import ScrollCards from "./menu/ScrollCards";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import NewsImage from "../../img/news.jpeg";

const Background = styled.div`
    background-image: url(${NewsImage});
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    margin-top: 4rem;
`;

const Container = styled.div`
    margin: -3rem auto 0;
    padding: 0rem 0 0;
    max-width: 1300px;
    min-height: 100vh;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 4rem 0 0rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const MediumTitle = styled.div`
    font-size: 2rem;
    color: #333;
    padding: 3rem 0 0rem 3rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
    background: transparent;
`;

const SmallTitle = styled(MediumTitle)`
    padding: 0 0 0 5rem;
    font-size: 1rem;
    margin: 1rem 0 -0.3rem;
`;

const GeneralNews = () => {
    const { data, loading, error } = useQuery(GENERAL_NEWS_QUERY);
    return (
        <>
            <MainTitle>Newsy</MainTitle>
            <Background>
                <Container>
                    {loading ? <Loading /> : null}
                    {!loading && !error ? (
                        <>
                            <MediumTitle>Newsy</MediumTitle>
                            <ScrollCards data={data.news} />
                            <MediumTitle>Wiesci</MediumTitle>
                            <SmallTitle>Wydarzyło się</SmallTitle>
                            <ScrollCards data={data.fam1} />
                            <SmallTitle>Zabraklo miedzy nami</SmallTitle>
                            <ScrollCards data={data.fam2} />
                            <SmallTitle>Witamy w rodzinie</SmallTitle>
                            <ScrollCards data={data.fam3} />
                            <MediumTitle>Podziękowania</MediumTitle>
                            <ScrollCards data={data.thanks} />
                            <MediumTitle>Zjazdy</MediumTitle>
                            <Reunion data={data.reunion} />
                        </>
                    ) : null}
                </Container>
            </Background>
        </>
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
        fam1: familynews(filter: 1) {
            id
            type
            text
            createdAt
        }
        fam2: familynews(filter: 2) {
            id
            type
            text
            createdAt
        }
        fam3: familynews(filter: 3) {
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
        thanks {
            id
            text
            createdAt
        }
    }
`;

export default GeneralNews;
