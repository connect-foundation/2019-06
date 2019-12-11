import React from 'react';
import S from './styled';

export const PageNumber = ({ value, onActive }) => (
  <S.NumberSpan id={value} active={onActive}>
    {value}
  </S.NumberSpan>
);
