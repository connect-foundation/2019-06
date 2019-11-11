import styled from 'styled-components';

const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  overflow: hidden;
`;

const Header = styled.div`
  flex: 0 0 50px;
  border: 1px solid blue;
`;

const Content = styled.div`
  flex: 0 0 auto;
  border: 1px solid yellow;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: 300px;
`;

const Aside = styled.aside`
  flex: 0 0 200px;
  border: 1px solid violet;
`;

const Section = styled.section`
  flex: 0 0 100%;
  border: 1px solid violet;
  display: flex;
  flex-direction: column;
`;

const Tools = styled.div`
  flex: 0 0 50px;
  border: 1px solid yellowgreen;
`;

const MailArea = styled.div`
  flex: 1 1 100%;
  border: 10px solid pink;
`;

export { FlexWrap, Header, Content, Aside, Section, Tools, MailArea };
