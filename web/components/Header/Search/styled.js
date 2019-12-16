import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 700px;
`;

const SearchBar = styled.div`
  display: flex;
  width: inherit;
  position: relative;
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

const SearchDetailWrap = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  width: 700px;
  position: absolute;
  top: 53px;
  min-height: 300px;
  z-index: 10;
  background: white;
  border: 1px solid #cccccc;
  padding: 10px 20px;
  box-sizing: border-box;
  flex-direction: column;
  & > * {
    margin-top: 20px;
  }
`;

const TextRight = styled.div`
  text-align: right;
  & > button + button {
    margin-left: 1rem;
  }
`;

export default {
  Wrap,
  SearchBar,
  SearchInput,
  SearchButton,
  SearchDetailWrap,
  TextRight,
};
