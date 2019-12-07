import styled from 'styled-components';

const CheckBox = styled.div`
  flex: 0 0 40px;
  padding: 10px;
`;

const Etc = styled.div`
  flex: 1 1;
  max-width: 300px;
  border: 1px solid blue;
  margin-left: 30px;
`;

const Filter = styled.div`
  flex: 0 0 40px;
`;

const SortItemView = styled.div`
  display: flex;
  align-items: center;
`;

export default { CheckBox, Etc, Filter, SortItemView };
