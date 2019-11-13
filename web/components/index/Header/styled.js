import styled from 'styled-components';

const Brand = styled.div`
  flex: 0 0 350px;
  font-size: 3rem;
  font-weight: bold;
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
  }
`;

const Search = styled.div`
  flex: 1 1;
  display: flex;
  align-items: center;
  & > * {
    height: 40px;
    box-sizing: border-box;
    border: none;
    background: #f1f3f4;
  }
`;

const SearchInput = styled.input`
  width: 600px;
`;

export { Brand, Search, SearchInput };
