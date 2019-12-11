import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Button } from '@material-ui/core';
import S from './styled';
import SearchInputRow from './Input';
import InputDate from './Input/InputDate';

const inputLabels = ['제목', '내용', '보낸사람', '받는사람'];

const searchInputs = inputLabels.map((inputLabel, i) => (
  <SearchInputRow key={`searchInput-${i}`} label={inputLabel} />
));

const Search = () => {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const reverseToggle = () => {
    setToggle(!toggle);
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };

  const handleSearchButton = event => {
    event.preventDefault();
    setToggle(false);
    // TODO : 검색 서버통신
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <S.Wrap ref={ref}>
      <S.SearchBar>
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
          <Button variant="contained" color="primary" onClick={handleSearchButton}>
            검색하기
          </Button>
        </S.TextRight>
      </S.SearchDetailWrap>
    </S.Wrap>
  );
};

export default Search;
