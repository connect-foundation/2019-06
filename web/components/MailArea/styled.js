import styled from 'styled-components';

const Section = styled.section`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ToolsWrapper = styled.div`
  flex: 0 0 50px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
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
  display: flex;
  border-top: 2px solid #e9ecef;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export default { Section, ToolsWrapper, MailArea, MailListArea, MailPagingArea };
