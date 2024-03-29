import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 0 0 50px;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 10px;
  font-size: 0.9rem;

  & + & {
    border-top: 2px solid #eceff1;
  }
`;

const ReadSign = styled.div`
  flex: 0 0 40px;
`;

const AddressText = styled.div`
  flex: 0 0 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => (props.isRead ? 'grey' : '#0459C1')};
`;

const Selectable = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
  flex: 1 1;
`;

const SubjectText = styled.div`
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
`;

const DateText = styled.div`
  display: flex;
  font-weight: 600;
  margin: 0 10px;
  color: grey;
`;

const ReservationText = styled.span`
  width: 35px;
  color: #0066ff;
  margin-left: 15px;
`;

const CategoryName = styled.div`
  color: grey;
  font-size: 0.75rem;
`;

export {
  Container,
  ReadSign,
  AddressText,
  Selectable,
  SubjectText,
  DateText,
  ReservationText,
  CategoryName,
};
