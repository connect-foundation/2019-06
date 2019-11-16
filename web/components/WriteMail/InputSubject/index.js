import React, { useContext } from 'react';
import S from './styled';
import GS from '../styled';
import { WriteMailContext } from '../ContextProvider';

const InputSubject = () => {
  const { subjectComponent } = useContext(WriteMailContext);
  return (
    <GS.RowWrapper>
      <GS.Label>제목</GS.Label>
      <S.InputSubject ref={subjectComponent} maxLength={50} />
    </GS.RowWrapper>
  );
};

export default InputSubject;
