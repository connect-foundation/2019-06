import styled from 'styled-components';

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
  width: 200px;
  margin: 20px;
`;

const Title = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

export default {
  Brand,
  Title,
  Logo,
};
