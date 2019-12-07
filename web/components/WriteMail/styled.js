import styled from 'styled-components';

export const Label = styled.div`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 75px 1fr;
  margin: 15px;
`;

export const WriteArea = styled.div`
  flex: 1 1;
  overflow: scroll;
`;
