import styled from 'styled-components';

const Container = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Tools = styled.div`
  flex: 0 0 50px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ReadArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  padding: 0 24px;
`;

const TitleView = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const Subject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    margin-left: 10px;
    flex: 1 1;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  span {
    margin: 8px 8px 8px 0;
    font-weight: 700;
  }
`;

const ReadFrame = styled.div`
  flex: 1 1;
`;

const Text = styled.span`
  width: 50px;
  color: #0066ff;
  margin-right: 15px;
`;

export { Container, ReadArea, Tools, TitleView, Subject, Address, ReadFrame, Text };
