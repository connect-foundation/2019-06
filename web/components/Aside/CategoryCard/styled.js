import styled from 'styled-components';

const Category = styled.div`
  cursor: pointer;
  &:hover {
    background: #e9ecef;
  }
  & + & {
    margin-top: 5px;
  }
`;

export { Category };
