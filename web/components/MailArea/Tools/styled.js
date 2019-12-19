import styled from 'styled-components';

const FlexWrap = styled.div`
  flex: 0 0 50px;
  height: 50px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
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
  flex: 1 1;
  height: inherit;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`;

const FlexRight = styled.div`
  height: inherit;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  margin-right: 75px;
`;

export default {
  FlexWrap,
  CheckBox,
  SortItemView,
  FlexRight,
  ButtonGroup,
  FlexLeft,
};
