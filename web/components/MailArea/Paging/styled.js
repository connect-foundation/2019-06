import styled from 'styled-components';

const NumberSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active ? 'red' : 'grey')};
  width: 40px;
  height: 40px;
  font-size: 1.4rem;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: rgba(100, 100, 100, 0.2);
  }
`;

export default { NumberSpan };
