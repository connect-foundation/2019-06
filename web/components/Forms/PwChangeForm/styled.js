import styled from 'styled-components';

const InputForm = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  margin-left: 10px;
  margin-bottom: 15px;
  padding: 0;
  font-size: 0.8rem;
  height: 0.6rem;
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
  padding: 10px;
`;

export default {
  InputForm,
  Button,
  WhiteButton,
  ErrorText,
  InputContainer,
  ButtonContainer,
  Title,
};
