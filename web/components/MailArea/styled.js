import styled from 'styled-components';

const Section = styled.section`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MailArea = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MailListArea = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const MailPagingArea = styled.div`
  flex: 0 0 50px;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  border-top: 2px solid #e9ecef;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const NothingMailView = styled.div`
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
    width: 400px;
  }
`;

export default { Section, MailArea, MailListArea, MailPagingArea, NothingMailView };
