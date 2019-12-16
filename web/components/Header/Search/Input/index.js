import React from 'react';
import S from './styled';
import { CHANGE_EVENT } from '../context';

const ACTION_TYPE = {
  제목: CHANGE_EVENT.INPUT.SUBJECT,
  내용: CHANGE_EVENT.INPUT.CONTENT,
  보낸사람: CHANGE_EVENT.INPUT.FROM,
  받는사람: CHANGE_EVENT.INPUT.TO,
};

const STATE_VALUE = {
  제목: 'subject',
  내용: 'content',
  보낸사람: 'from',
  받는사람: 'to',
};

const SearchInputRow = ({ label, dispatch, state }) => {
  const actionType = ACTION_TYPE[label];
  const stateValue = STATE_VALUE[label];

  const handleInputChange = ({ target: { value } }) => {
    if (value && value !== '') {
      value = value.trim();
    }
    dispatch({ type: actionType, payload: value });
  };

  return (
    <S.FlexRowWrap>
      <S.Label>{label}</S.Label>
      <S.Input onChange={handleInputChange} value={state[stateValue]} />
    </S.FlexRowWrap>
  );
};

export default SearchInputRow;
