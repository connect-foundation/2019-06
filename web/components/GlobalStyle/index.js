import styled from 'styled-components';

const FlexWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FlexRowWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const FlexCenterWrap = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
`;

const FlexRowCenterWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallBoard = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #a4b0be;
  border-radius: 15px;
  width: 800px;
`;

const SmallColumnBoard = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 800px;
`;

const FlexItem = styled(FlexWrap)`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const HorizontalLine = styled.hr`
  margin-top: 35px;
  width: 300px;
  color: #bdc3c7;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 85%;
`;

const AlignLeftContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-start;
`;

export {
  FlexWrap,
  FlexRowWrap,
  FlexCenterWrap,
  FlexRowCenterWrap,
  FlexItem,
  Content,
  HorizontalLine,
  SmallBoard,
  SmallColumnBoard,
  AlignLeftContainer,
};
