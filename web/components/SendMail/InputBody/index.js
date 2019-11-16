import React, { useContext } from 'react';
import S from './styled';
import GS from '../styled';
import { sendMailContext } from '../context';

const InputBody = () => {
  const { bodyComponent } = useContext(sendMailContext);

  return (
    <GS.RowWrapper>
      <GS.Label>내용</GS.Label>
      <S.WriteBody ref={bodyComponent} contentEditable={true} />
    </GS.RowWrapper>
  );
};

export default InputBody;
