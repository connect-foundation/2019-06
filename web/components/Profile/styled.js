import styled from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Container = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserDataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 10px 0;
`;

const AlignRightContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-top: 20px;
`;

const ColumnItem = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px 15px 0 40px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: #3475e0;
  color: white;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 10px 0 auto;
  border: 0;
  cursor: pointer;
`;

const ErrorText = styled.span`
  width: 100%;
  color: red;
  margin-left: 10px;
  margin-bottom: 15px;
  padding: 0;
  font-size: 0.8rem;
  height: 0.6rem;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
  padding: 10px;
`;

const Text = styled.span`
  font-size: 1.2rem;
  width: 100px;
  margin: 10px;
`;

const DescText = styled.span`
  font-size: 1rem;
  width: 100px;
`;

const EmailText = styled.span`
  width: 100%;
  font-size: 1rem;
`;

const ItemContainer = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightArrow = styled(ArrowForwardIosIcon)`
  width: 15px;
  height: 15px;
`;

export default {
  Container,
  UserDataContainer,
  Button,
  ErrorText,
  ColumnContainer,
  RowContainer,
  ColumnItem,
  AlignRightContainer,
  Title,
  Text,
  DescText,
  EmailText,
  ItemContainer,
  RightArrow,
};
