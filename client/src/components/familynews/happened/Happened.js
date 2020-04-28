import React from "react";
import styled from "styled-components";
import Item from "../items/Item";
import { uuid } from "uuidv4";

const Container = styled.div`
    margin: auto;
`;

const MainTitle = styled.div`
    font-size: 1.5rem;
`;

const Map = ({ data }) => {
    return (
        <>
            {data.map((item) => {
                return <Item key={uuid()} data={item} />;
            })}
        </>
    );
};

const FamilyNewsSection = ({ data }) => {
    return (
        <Container>
            <MainTitle>Wydarzyło się</MainTitle>
            {data.length > 0 ? <Map data={data} /> : <p>No Data</p>}
        </Container>
    );
};

export default FamilyNewsSection;
