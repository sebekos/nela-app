import styled from "styled-components";

const LightButton = styled.button`
    color: black;
    padding: 0.3rem 1rem;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in;
    outline: none;
    background-color: #e3e3e3;
    &:hover {
        opacity: 0.8;
    }
    & > a {
        color: white;
    }
`;

export default LightButton;
