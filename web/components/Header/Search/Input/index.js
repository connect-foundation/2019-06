import React from 'react';
import S from './styled';

const SearchInputRow = ({ label }) => {
  return (
    <S.FlexRowWrap>
      <S.Label>{label}</S.Label>
      <S.Input />
    </S.FlexRowWrap>
  );
};

export default SearchInputRow;
