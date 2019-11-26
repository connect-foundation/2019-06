import styled from 'styled-components';

const MailTemplateWrap = styled.div`
  display: flex;
  flex: 0 0 50px;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 10px;
  font-size: 0.9rem;

  & + & {
    border-top: 2px solid #eceff1;
  }

  & > div {
    &:nth-child(1) {
      flex: 0 0 30px;
    }

    &:nth-child(2) {
      flex: 0 0 40px;
      cursor: pointer;
    }

    &:nth-child(3) {
      flex: 0 0 40px;
    }

    &:nth-child(4) {
      flex: 0 0 40px;
      cursor: pointer;
    }

    &:nth-child(5) {
      flex: 0 0 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      color: ${props => (props.isRead ? 'grey' : '#0459C1')};
      &:hover {
        text-decoration: underline;
      }
    }

    &:nth-child(6) {
      flex: 1 1;
      margin-left: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      color: ${props => (props.isRead ? 'grey' : '#0459C1')};
      &:hover {
        text-decoration: underline;
      }
    }

    &:nth-child(7) {
      font-weight: 600;
      margin: 0 10px;
      color: grey;
    }
  }
`;

export { MailTemplateWrap };
