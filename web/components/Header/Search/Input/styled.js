import styled from 'styled-components';

const FlexRowWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  width: 100px;
  font-size: 1rem;
  color: rgba(100, 100, 100, 0.8);
`;

const Input = styled.input`
  flex: 1 1;
  border: none;
  border-bottom: 1px solid #eceff1;
  outline: none;
  &:focus {
    border-bottom: 1px solid blue;
  }
`;

export default {
  FlexRowWrap,
  Label,
  Input,
};
