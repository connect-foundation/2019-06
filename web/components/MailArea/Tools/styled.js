import styled from 'styled-components';

const CheckBox = styled.div`
  flex: 0 0 40px;
  padding: 10px;
`;

const SortItemView = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  margin-right: 20px;
`;

const FlexLeft = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Sort = styled.div`
  flex: 0 0 150px;
  height: inherit;
  overflow: hidden;
`;

export default { CheckBox, Sort, SortItemView, ButtonGroup, FlexLeft };
