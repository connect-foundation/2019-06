import styled from 'styled-components';

const Label = styled.div`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 75px 500px;
`;

const DivWrite = styled.div`
  display: grid;
  grid-row-gap: 8px;
`;

export default { Label, RowWrapper, DivWrite };
