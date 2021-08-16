import styled, {css} from 'styled-components';

const Button = styled.button`
    background: grey;
    border-radius: 3px;
    border: 2px solid black;
    color: white;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    height: 40px;
    font-size: 0.9em;
    ${(props) => props.disabled};
    ${(props) =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
        `};
`;

export default Button;
