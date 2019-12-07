import styled from 'styled-components';

const Brand = styled.div`
  flex: 0 0 350px;
  font-size: 3rem;
  font-weight: bold;
`;

const Center = styled.div`
  text-align: center;
`;

const Atag = styled.a`
  display: flex;
  width: 300px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  background: url('https://avatars2.githubusercontent.com/u/57168983?s=70&v=4') no-repeat;
  background-size: 17%;
  justify-content: center;
  align-items: center;
  background-position: 15px 0px;
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

const Header = styled.div`
  flex: 0 0 70px;
  display: flex;
  border-bottom: 2px solid #eceff1;
  flex-direction: row;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 10px;
`;

export { Brand, Center, Search, SearchInput, Atag, Header };
