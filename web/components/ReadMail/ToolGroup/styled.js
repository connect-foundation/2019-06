import styled from 'styled-components';

const Container = styled.div`
  flex: 0 0 50px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0 20px;
`;

const ButtonSet = styled.div`
  button + button {
    border-left: none;
  }

  button {
    height: 28px;
    padding: 0 9px;
    border: 2px solid #cbcbcb;
    background-color: #f8f8f8;
    color: #333;
    font: 700 14px Arial;
    cursor: pointer;
  }

  button:hover {
    background-color: #cbcbcb;
  }
`;

export { Container, ButtonSet };
