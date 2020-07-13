import React from "react";
import styled from "styled-components";
import NewsPng from "../../img/news.png";
import PrimaryButton from "../universal/PrimaryButton";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    background-color: #f0f0f0;
    align-items: center;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ImgContainer = styled.div`
    max-width: 650px;
    justify-self: end;
    padding: 5rem 3rem;
    @media (max-width: 768px) {
        display: none;
    }
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = () => {
    return (
        <ImgContainer>
            <Img src={NewsPng} />
        </ImgContainer>
    );
};

const TextContainer = styled.div`
    text-align: center;
    max-width: 650px;
    padding: 5rem 3rem;
`;

const TextTitle = styled.div`
    font-size: 2rem;
    padding: 0rem 0 1rem;
`;

const TextDesc = styled.div`
    font-size: 1rem;
`;

const FamilyButton = styled(PrimaryButton)`
    padding: 0.5rem 2rem;
    margin: 2rem;
    font-size: 1rem;
`;

const Text = ({ onNews }) => {
    return (
        <TextContainer>
            <TextTitle>Newsy</TextTitle>
            <TextDesc>
                Witamy na stronie www.pytlewski.pl. Wszystkie aktualne informacje dotyczące strony będą podawane tutaj pod zdjęciem młyna.
                Zapraszamy ponownie...
            </TextDesc>
            <FamilyButton onClick={onNews}>Newsy</FamilyButton>
        </TextContainer>
    );
};

const News = () => {
    const history = useHistory();
    const [setNewsTab] = useMutation(SET_NEWS_TAB, {
        onCompleted: () => history.push("/newsy")
    });
    const onNews = () => {
        setNewsTab({
            variables: {
                page: 0
            }
        });
    };
    return (
        <Container>
            <Image />
            <Text onNews={onNews} />
        </Container>
    );
};

const SET_NEWS_TAB = gql`
    mutation NewsTab($page: Int!) {
        set_news_tab(page: $page) @client
    }
`;

export default News;
