import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Tabs, Tab } from "@material-ui/core";
import NameSearch from "./NameSearch";
import AlphaSearch from "./AlphaSearch";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const Container = styled.div`
    margin: auto;
    padding: 0rem 0 0;
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

const Family = () => {
    const [value, setValue] = useState(0);

    const { loading } = useQuery(FAMILY_TAB, {
        onCompleted: (data) => {
            setValue(data.family_tab.page);
        }
    });

    const [setFamTab] = useMutation(SET_FAMILY_TAB);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFamTab({
            variables: {
                page: newValue
            }
        });
    };
    return (
        <Container>
            <MainTitle>Rodzina</MainTitle>
            {!loading && (
                <>
                    <Paper>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                            <Tab style={{ textTransform: "capitalize" }} label="Szukaj" />
                            <Tab style={{ textTransform: "capitalize" }} label="Lista" />
                        </Tabs>
                    </Paper>
                    <NameSearch value={value} index={0} />
                    <AlphaSearch value={value} index={1} />
                </>
            )}
        </Container>
    );
};

const FAMILY_TAB = gql`
    {
        family_tab @client {
            page
        }
    }
`;

const SET_FAMILY_TAB = gql`
    mutation FamilyTab($page: Int!) {
        set_family_tab(page: $page) @client
    }
`;

export default Family;
