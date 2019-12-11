import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  max-width: 700px;
  height: 50px;
  background: #f1f3f4;
  border-radius: 10px;
  align-items: center;
  box-sizing: border-box;
  & > * {
    border: none;
    background: none;
    outline: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  background: none;
  height: inherit;
  & > * {
    padding: 7px;
  }
  &:hover {
    & > * {
      background: rgba(100, 100, 100, 0.2);
      border-radius: 50%;
    }
  }
`;

const SearchInput = styled.input`
  width: 600px;
  height: inherit;
  font-size: 1rem;
`;

export default {
  Wrap,
  SearchInput,
  SearchButton,
};
