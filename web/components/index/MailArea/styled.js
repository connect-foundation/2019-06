import styled from 'styled-components';

const Tools = styled.div`
  flex: 0 0 50px;
  border-bottom: 2px solid #e9ecef;
  border: 5px solid violet;
  display: flex;
  border: 3px solid pink;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const MailArea = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid red;
`;

const MailListArea = styled.div`
  flex: 1 1;
  overflow-y: scroll;
`;

const MailPagingArea = styled.div`
  flex: 0 0 50px;
  display: flex;
  border: 3px solid pink;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export { Tools, MailArea, MailListArea, MailPagingArea };
