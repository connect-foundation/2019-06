import styled from 'styled-components';

const ReadArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
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
  justify-content: space-between;
  align-items: center;
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin: 8px 8px 8px 0;
    font-weight: 700;
  }
`;

const ReadFrame = styled.div``;

export { ReadArea, TitleView, Subject, Address, ReadFrame };
