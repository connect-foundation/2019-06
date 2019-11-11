import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
  height: 100%;
`;

const Title = styled.span`
  font-size: 15px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

export default {
  Header,
  Title,
  Logo,
};
