import styled from 'styled-components';

const Header = styled.div`
  flex: 0 0 70px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 2px solid #eceff1;
`;

const Brand = styled.div`
  flex: 0 0 250px;
  height: inherit;
  font-size: 3rem;
  font-weight: bold;
  box-sizing: border-box;
`;

const Logo = styled.img`
  display: block;
  cursor: pointer;
  height: 60px;
  margin-left: 10px;
`;

const Search = styled.div`
  flex: 1 1;
`;

export { Brand, Search, Header, Logo };
