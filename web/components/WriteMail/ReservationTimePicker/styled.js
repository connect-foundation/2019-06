import styled from 'styled-components';

const InputForm = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ColumnContainer = styled.div`
  margin-left: 20px;
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: #3475e0;
  color: white;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  border: 0;
  cursor: pointer;
`;

const WhiteButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid gray;
`;

const ErrorText = styled.span`
  width: 100%;
  color: red;
  margin-top: 10px;
  padding: 0;
  font-size: 0.8rem;
  height: 0.6rem;
`;

const Title = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
  padding: 20px;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: black;
  margin: 5px;
  text-decoration: none;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
`;

export default {
  InputForm,
  Button,
  WhiteButton,
  ErrorText,
  RowContainer,
  ColumnContainer,
  ButtonContainer,
  Title,
  Text,
};
