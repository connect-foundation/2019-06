import styled from 'styled-components';

const Container = styled.div`
  flex: 0 0 50px;
  height: 50px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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

const SortSelector = styled.div`
  flex: 0 0 150px;
  height: inherit;
  overflow: hidden;
`;

export default {
  Container,
  CheckBox,
  SortSelector,
  SortItemView,
  ButtonGroup,
  FlexLeft,
};
