import React, { useState, useRef, useEffect, useReducer, useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Button } from '@material-ui/core';
import S from './styled';
import SearchInputRow from './Input';
import InputDate from './Input/InputDate';
import { initialState, reducer } from './context';
import { changeUrlWithoutRunning } from '../../../utils/url/change-query';

const inputLabels = ['제목', '내용', '보낸사람', '받는사람'];

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchWrapRef = useRef(null);
  const [detailToggleBtn, setDetailToggleBtn] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const handleOutsiderClick = event => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(event.target)) {
        setDetailToggleBtn(false);
      }
    };

    document.addEventListener('click', handleOutsiderClick, true);
  }, []);

  const handleSearchClick = () => {
    console.log('handle search');
    changeUrlWithoutRunning({ view: 'search', search: searchText });
  };

  const handleDetailSearchClick = () => {
    setDetailToggleBtn(false);

    const searchTexts = [];

    for (const [key, value] of Object.entries(state)) {
      if (value) {
        searchTexts.push(`${key}:${value}`);
      }
    }

    if (searchTexts.length === 0) {
      return;
    }

    setSearchText(searchTexts.join(' '));
    handleSearchClick();
  };

  const handleSearchInputKeyPress = event => {
    if (event.key === 'Enter' && searchText !== '') {
      handleSearchClick();
    }
  };

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
          onKeyPress={handleSearchInputKeyPress}
        />
        <S.SearchButton onClick={() => setDetailToggleBtn(!detailToggleBtn)}>
          {detailToggleBtn ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </S.SearchButton>
      </S.SearchBar>
      <S.SearchDetailWrap visible={detailToggleBtn}>
        {inputLabels.map((inputLabel, i) => (
          <SearchInputRow key={`searchInput-${i}`} label={inputLabel} dispatch={dispatch} />
        ))}
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
