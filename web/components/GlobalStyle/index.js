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

export { FlexWrap, FlexCenterWrap, Content, Aside, Section, Footer, HorizontalLine };
