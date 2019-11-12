import styled from 'styled-components';

const Header = styled.div`
  flex: 0 0 70px;
  display: flex;
  border-bottom: #eceff1;
  flex-direction: row;
  overflow: hidden;
`;

const Brand = styled.div`
  flex: 0 0 350px;
  font-size: 3rem;
  font-weight: 900;
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
  }
`;

const Search = styled.div`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  & > * {
    height: 55px;
    box-sizing: border-box;
    border: none;
    background: #f1f3f4;
  }
`;

const SearchInput = styled.input`
  width: 550px;
`;

export { Header, Brand, Search, SearchInput };
