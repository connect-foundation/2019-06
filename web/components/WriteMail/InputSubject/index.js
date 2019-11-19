import React, { useContext } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import { WriteMailContext } from '../ContextProvider';

const InputSubject = () => {
  const { subjectComponent } = useContext(WriteMailContext);
  return (
    <WM_S.RowWrapper>
      <WM_S.Label>제목</WM_S.Label>
      <S.InputSubject ref={subjectComponent} maxLength={50} />
    </WM_S.RowWrapper>
  );
};

export default InputSubject;
