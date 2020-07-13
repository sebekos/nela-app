import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab, CircularProgress } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ReunionPanels from "./Panels/ReunionPanels";
import GenPanels from "./Panels/GenPanels";

import LandingImage from "../../img/news.jpeg";

const Background = styled.div`
    background-image: none;
    background-color: lightgrey;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    @media (max-width: 768px) {
        background-image: none;
    }
`;

const Container = styled.div`
    margin: auto;
    padding: 0rem 0 0;
    min-height: 100vh;
    max-width: fit-content;
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

const GeneralNews = () => {
    const { data, loading, error } = useQuery(GENERAL_NEWS_QUERY);
    const [value, setValue] = useState(0);
    useQuery(NEWS_TAB, {
        onCompleted: (data) => {
            setValue(data.news_tab.page);
        }
    });
    const [setNewsTab] = useMutation(SET_NEWS_TAB);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setNewsTab({
            variables: {
                page: newValue
            }
        });
    };
    return (
        <>
            <MainTitle>Newsy</MainTitle>
            <Background>
                <Paper className="maintree">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab style={{ textTransform: "capitalize" }} label="Newsy" />
                        <Tab style={{ textTransform: "capitalize" }} label="Wydarzyło się" />
                        <Tab style={{ textTransform: "capitalize" }} label="Zabraklo miedzy nami" />
                        <Tab style={{ textTransform: "capitalize" }} label="Witamy w rodzinie" />
                        <Tab style={{ textTransform: "capitalize" }} label="Podziękowania" />
                        <Tab style={{ textTransform: "capitalize" }} label="Zjazdy" />
                    </Tabs>
                </Paper>
                <Container>
                    {loading && <Loading />}
                    {!loading && !error && (
                        <>
                            <GenPanels value={value} data={data.news} index={0} />
                            <GenPanels value={value} data={data.happened} index={1} />
                            <GenPanels value={value} data={data.later} index={2} />
                            <GenPanels value={value} data={data.hello} index={3} />
                            <GenPanels value={value} data={data.thanks} index={4} />
                            <ReunionPanels value={value} data={data.reunion} index={5} />
                        </>
                    )}
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
        happened: familynews(filter: 1) {
            id
            type
            text
            createdAt
        }
        later: familynews(filter: 2) {
            id
            type
            text
            createdAt
        }
        hello: familynews(filter: 3) {
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

const NEWS_TAB = gql`
    {
        news_tab @client {
            page
        }
    }
`;

const SET_NEWS_TAB = gql`
    mutation NewsTab($page: Int!) {
        set_news_tab(page: $page) @client
    }
`;

export default GeneralNews;
