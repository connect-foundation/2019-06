import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
`;

const UserDataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 1rem;
`;

export default {
  Container,
  UserDataContainer,
  Button,
  ErrorText,
  ColumnContainer,
  ColumnItem,
  Title,
  Text,
};
