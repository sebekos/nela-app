import React from "react";
import styled from "styled-components";
import Item from "../items/Item";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

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

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const FamilyNewsSection = ({ data }) => {
    return (
        <Container>
            <MainTitle>Zabraklo miedzy nami</MainTitle>
            {data.length > 0 ? <Map data={data} /> : <p>No Data</p>}
        </Container>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

export default FamilyNewsSection;
