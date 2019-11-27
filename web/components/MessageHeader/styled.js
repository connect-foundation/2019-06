import styled, { keyframes } from 'styled-components';

const topToBottom = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(50px);
  }
`;

const TopContainer = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: fixed;
  left: 0;
  top: -50px;

  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #7f8fa6;

  animation: ${topToBottom} 1s normal forwards ease-in-out;
`;

const Text = styled.span`
  font-size: 16px;
  margin-left: 20px;
  color: white;
`;

export { TopContainer, Text };
