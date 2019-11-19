import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const Loading = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  overflow: hidden;

  &,
  &::before,
  &::after {
    box-sizing: border-box;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -200%;
    top: -75%;
    width: 500%;
    height: 250%;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 100%, 100% 50%, 100% 100%;
    background-position: 100% 100%;
    background-image: linear-gradient(#ff9966, #ff5e62), linear-gradient(#a1c4fd, #c2e9fb),
      linear-gradient(#667eea, #764ba2), linear-gradient(#ff9a9e, #fad0c4);
    animation: ${rotate} 6s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 1rem;
    top: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    background: white;
  }
`;

export default { Loading };
