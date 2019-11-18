import styled from 'styled-components';

const FlexWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FlexCenterWrap = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
`;

const HorizontalLine = styled.hr`
  margin-top: 35px;
  width: 300px;
  color: #bdc3c7;
`;

const Content = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export { FlexWrap, FlexCenterWrap, Content, HorizontalLine };
