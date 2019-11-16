import React, { useContext } from 'react';
import S from './styled';
import GS from '../styled';
import { sendMailContext } from '../context';

const InputSubject = () => {
  const { subjectComponent } = useContext(sendMailContext);
  return (
    <GS.RowWrapper>
      <GS.Label>제목</GS.Label>
      <S.InputSubject ref={subjectComponent} maxLength={50} />
    </GS.RowWrapper>
  );
};

export default InputSubject;
