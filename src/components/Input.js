import styled from 'styled-components';

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    color: ${(props) => props.inputColor || 'orange'};
    background: gray;
    border: none;
    border-radius: 3px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;
export default Input;
