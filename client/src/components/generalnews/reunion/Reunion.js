import React from "react";
import styled from "styled-components";
import Item from "./ReunionItem";
import PropTypes from "prop-types";

const Container = styled.div`
    max-width: 1100px;
    margin: auto;
`;

const NoDataContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const NoData = () => {
    return <NoDataContainer>No Reunions :(</NoDataContainer>;
};

const Map = ({ reunion }) => {
    return (
        <>
            {reunion.map((data, index) => (
                <Item key={`newsitem-${index}`} data={data} />
            ))}
        </>
    );
};

Map.propTypes = {
    reunion: PropTypes.array.isRequired
};

const Reunion = ({ data }) => {
    return (
        <Container>
            {data.length > 0 ? <Map reunion={data} /> : null}
            {data && data.length === 0 ? <NoData /> : null}
        </Container>
    );
};

export default Reunion;
