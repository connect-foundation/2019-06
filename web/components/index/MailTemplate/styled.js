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

  & > div {
    &:nth-child(1) {
      flex: 0 0 20px;
    }

    &:nth-child(2) {
      flex: 0 0 50px;
    }

    &:nth-child(3) {
      flex: 0 0 50px;
    }

    &:nth-child(4) {
      flex: 0 0 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:nth-child(5) {
      flex: 1 1;
      margin-left: 15px;
    }
    &:nth-child(6) {
      flex: 0 0 100px;
    }
  }
`;

export { MailTemplateWrap };
