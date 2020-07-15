import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { uuid } from "uuidv4";
import styled from "styled-components";
import { CircularProgress, List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AbcImage from "../../img/abc.png";
import moment from "moment";

const Container = styled.div`
    width: max-content;
    margin: auto;
`;

const AlphaContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    width: max-content;
    margin: 2rem auto 1rem;
    @media (max-width: 768px) {
        display: none;
    }
    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
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

const ListItems = ({ alphaData, history }) => {
    const onClick = (link) => {
        history.push(link);
    };
    return (
        <List className="alphalist">
            {alphaData.map((person) => {
                const { first_name, last_name, birth_date } = person;
                const firstName = first_name ? `, ${first_name}` : "";
                const dates = birth_date ? ` - ${moment(birth_date, "YYYY-MM-DD").format("DD.MM.YYYY")}` : "";
                const secondary = `${last_name}${firstName}${dates}`;
                return (
                    <ListItem divider={true} key={uuid()} onClick={(e) => onClick(`/Rodzina/${person.id}`)} style={{ cursor: "pointer" }}>
                        <ListItemText primary={`${secondary}`} />
                    </ListItem>
                );
            })}
        </List>
    );
};

const AbcImgContainer = styled.div`
    width: max-content;
    margin: auto;
`;

const Image = styled.img`
    width: 350px;
    height: auto;
    margin: 4rem 0;
`;

const Abc = ({ isVisible }) => {
    return (
        <AbcImgContainer>
            <Image className={isVisible ? "fadeIn" : "fadeOut"} src={AbcImage} alt="tree" />
        </AbcImgContainer>
    );
};

const AlphaSearch = ({ value, index }) => {
    const history = useHistory();

    const [isVisible, setIsVisible] = useState(true);
    const [listData, setListData] = useState(null);
    const { loading, data } = useQuery(ALPHA_SEARCH);

    useQuery(LOCAL_RESULTS_QUERY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            if (data) {
                setIsVisible(false);
                setListData(data.searchAlpha);
            }
        }
    });

    const [alphaList, { loading: alphaLoading }] = useLazyQuery(ALPHA_LIST, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            setListData(data.alphaList.results);
        }
    });

    const onAlpha = (e) => {
        setIsVisible(false);
        alphaList({
            variables: {
                filter: e.target.getAttribute("value")
            }
        });
    };

    if (value !== index) return null;

    return (
        <Container>
            {!loading && data && data.alphaSearch && <AlphaKeys data={data.alphaSearch} onAlpha={onAlpha} />}
            {loading || alphaLoading ? <Loading /> : null}
            {!listData && <Abc isVisible={isVisible} />}
            {!alphaLoading && listData && listData.length > 0 ? <ListItems alphaData={listData} history={history} /> : null}
        </Container>
    );
};

const LOCAL_RESULTS_QUERY = gql`
    {
        searchAlpha @client
    }
`;

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
            results {
                id
                first_name
                middle_name
                last_name
                birth_date
            }
        }
        set_family_letter(letter: $filter) @client
    }
`;

export default AlphaSearch;
