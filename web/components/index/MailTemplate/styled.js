import styled from 'styled-components';

const MailTemplateWrap = styled.div`
  display: flex;
  flex: 0 0 50px;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 10px;
  cursor: pointer;
  & + & {
    border-top: 2px solid #eceff1;
  }
  &:hover {
    border-left: 2px solid #eceff1;
    border-right: 2px solid #eceff1;
  }
`;
export { MailTemplateWrap };
