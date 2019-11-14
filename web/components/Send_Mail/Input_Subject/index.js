import React from 'react';
import S from './styled';
import GS from '../styled';

const InputSubject = () => {
  return (
    <GS.RowWrapper>
      <GS.Label>제목</GS.Label>
      <S.InputSubject maxLength={50} />
    </GS.RowWrapper>
  );
};

export default InputSubject;
