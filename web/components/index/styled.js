import styled from 'styled-components';

const FlexWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  flex: 0 0 50px;
  display: flex;
  border-bottom: 2px solid #eceff1;
  flex-direction: row;
  overflow: hidden;
  padding: 5px 10px;
`;

const Content = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
`;

const Section = styled.section`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Footer = styled.footer`
  flex: 0 0 30px;
  border-top: 2px solid #e9ecef;
  text-align: center;
`;

export { FlexWrap, Header, Content, Aside, Section, Footer };
