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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toggle, setToggle] = useState(false);
  const searchWrapRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    document.addEventListener(
      'click',
      event => {
        if (searchWrapRef.current && !searchWrapRef.current.contains(event.target)) {
          setToggle(false);
        }
      },
      true,
    );
  }, []);

  const handleSearchClick = event => {
    console.log('search click');
  };

  const handleDetailSearchClick = () => {
    setToggle(false);

    const searchTexts = [];

    for (const [key, value] of Object.entries(state)) {
      if (value) {
        searchTexts.push(`${key}:${value}`);
      }
    }

    setSearchText(searchTexts.join(' '));
  };

  console.log('재랜더링2');
  const searchInputs = inputLabels.map((inputLabel, i) => (
    <SearchInputRow key={`searchInput-${i}`} label={inputLabel} dispatch={dispatch} />
  ));

  return (
    <S.Wrap ref={searchWrapRef}>
      <S.SearchBar>
        <S.SearchButton onClick={handleSearchClick}>
          <SearchIcon />
        </S.SearchButton>
        <S.SearchInput
          placeholder="메일 검색"
          type="text"
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
        />
        <S.SearchButton onClick={() => setToggle(!toggle)}>
          {toggle ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </S.SearchButton>
      </S.SearchBar>
      <S.SearchDetailWrap visible={toggle}>
        {[...searchInputs]}
        <InputDate label="기간" dispatch={dispatch} />
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
