import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tree2 from "./trees/tree2/Tree2";
import Tree3 from "./trees/tree3/Tree3";

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
    width: max-content;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const SelectsContainer = styled.div`
    display: flex;
    width: 1300px;
    & > div {
        margin: 0.5rem;
    }
`;

const Selects = ({ onClick }) => {
    return (
        <SelectsContainer>
            <div>
                <input defaultChecked onClick={onClick} type="radio" name="tree" value="tree2" />
            </div>
            <div>
                <input onClick={onClick} type="radio" name="tree" value="tree3" />
            </div>
        </SelectsContainer>
    );
};

Selects.propTypes = {
    onClick: PropTypes.func.isRequired
};

const FamilyInfo = ({ match }) => {
    const [tree, setTree] = useState("tree2");
    const onClick = (e) => setTree(e.target.value);
    return (
        <Container>
            <MainTitle>Person Info</MainTitle>
            <Selects onClick={onClick} />
            {tree === "tree2" ? <Tree2 person_key={parseInt(match.params.id)} /> : null}
            {tree === "tree3" ? <Tree3 person_key={parseInt(match.params.id)} /> : null}
        </Container>
    );
};

export default FamilyInfo;
