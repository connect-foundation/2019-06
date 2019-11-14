import React from 'react';
import S from './styled';

const InputSubject = () => {
  return (
    <>
      <S.Label>제목</S.Label>
      <S.InputSubject maxLength={50} />
    </>
  );
};

export default InputSubject;
