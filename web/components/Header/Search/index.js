import React, { useState, useRef, useEffect, useReducer } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Button } from '@material-ui/core';
import S from './styled';
import SearchInputRow from './Input';
import InputDate from './Input/InputDate';
import { initialState, reducer } from './context';

const inputLabels = ['제목', '내용', '보낸사람', '받는사람'];

const Search = () => {
  const [searchOptions, dispatchSearchOptions] = useReducer(reducer, initialState);
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const reverseToggle = event => {
    event.preventDefault();
    setToggle(!toggle);
  };

  const handleOutsideClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };

  const handleSearchClick = event => {
    event.preventDefault();
    console.log('search click');
  };

  const handleDetailSearchClick = event => {
    event.preventDefault();
    setToggle(false);
    console.log('search detail');
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
  }, []);

  const searchInputs = inputLabels.map((inputLabel, i) => (
    <SearchInputRow key={`searchInput-${i}`} label={inputLabel} dispatch={dispatchSearchOptions} />
  ));

  return (
    <S.Wrap ref={ref}>
      <S.SearchBar onClick={handleSearchClick}>
        <S.SearchButton>
          <SearchIcon />
        </S.SearchButton>
        <S.SearchInput placeholder="메일 검색" type="text" />
        <S.SearchButton onClick={reverseToggle}>
          {toggle ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </S.SearchButton>
      </S.SearchBar>
      <S.SearchDetailWrap visible={toggle}>
        {[...searchInputs]}
        <InputDate label="기간" />
        <S.TextRight>
          <Button variant="contained" color="primary" onClick={handleDetailSearchClick}>
            검색하기
          </Button>
        </S.TextRight>
      </S.SearchDetailWrap>
    </S.Wrap>
  );
};

export default Search;
