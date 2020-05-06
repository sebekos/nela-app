import React from "react";
import styled from "styled-components";
import Item from "../items/Item";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

const Container = styled.div`
    margin: 2rem auto 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
`;

const MainTitle = styled.div`
    font-size: 1.5rem;
`;

const InfoContainer = styled.div`
    width: 500px;
    text-align: center;
`;

const Info = () => {
    return (
        <InfoContainer>
            <MainTitle>Zabraklo miedzy nami</MainTitle>
        </InfoContainer>
    );
};

const MapContainer = styled.div``;

const Map = ({ data }) => {
    return (
        <MapContainer>
            {data.map((item) => {
                return <Item key={uuid()} data={item} />;
            })}
        </MapContainer>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

const FamilyNewsSection = ({ data }) => {
    return (
        <Container>
            <Info />
            {data.length > 0 ? <Map data={data} /> : <p>No Data</p>}
        </Container>
    );
};

Map.propTypes = {
    data: PropTypes.array.isRequired
};

export default FamilyNewsSection;
