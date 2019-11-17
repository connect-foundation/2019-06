import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: 2px solid #f5f6f8;
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  background-color: white;
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  background-color: #1e90ff;
  color: white;
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  border: 0;
`;

const ErrorText = styled.span`
  width: 100%;
  color: red;
  margin: 0;
  padding: 0;
  font-size: 0.6rem;
`;

export default {
  Input,
  Form,
  Button,
  ErrorText,
};
