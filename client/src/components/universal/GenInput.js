import styled from "styled-components";

const GenInput = styled.input`
    display: block;
    width: 100%;
    padding: 0.2rem;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    &:disabled {
        background-color: lightgrey;
    }
`;

export default GenInput;
