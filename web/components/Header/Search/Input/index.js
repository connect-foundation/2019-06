import React from 'react';
import S from './styled';
import { BLUR_EVENTS } from '../context';

const getActionTypeByLabel = {
  제목: BLUR_EVENTS.SUBJECT,
  내용: BLUR_EVENTS.CONTENT,
  보낸사람: BLUR_EVENTS.FROM,
  받는사람: BLUR_EVENTS.TO,
};

const SearchInputRow = ({ label, dispatch }) => {
  const actionType = getActionTypeByLabel[label];

  const handleInputBlur = ({ target: { value } }) => {
    if (value && value !== '') {
      value = value.trim();
    }
    dispatch({ type: actionType, payload: value });
  };

  return (
    <S.FlexRowWrap>
      <S.Label>{label}</S.Label>
      <S.Input onBlur={handleInputBlur} />
    </S.FlexRowWrap>
  );
};

export default SearchInputRow;
