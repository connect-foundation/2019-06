import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import S from './styled';

const Search = () => {
  return (
    <S.Wrap>
      <S.SearchButton>
        <SearchIcon />
      </S.SearchButton>
      <S.SearchInput placeholder="메일 검색" type="text" />
      <S.SearchButton>
        <ArrowDropDownIcon />
      </S.SearchButton>
    </S.Wrap>
  );
};

export default Search;
