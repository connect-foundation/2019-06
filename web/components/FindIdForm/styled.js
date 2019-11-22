import styled from 'styled-components';

const InputForm = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

export default {
  InputForm,
  Button,
  ErrorText,
  InputContainer,
  Title,
};
