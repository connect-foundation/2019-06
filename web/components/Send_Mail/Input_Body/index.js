import React from 'react';
import S from './styled';
import GS from '../styled';

const InputBody = () => {
  return (
    <GS.RowWrapper>
      <GS.Label>내용</GS.Label>
      <S.WriteBody contentEditable={true} />
    </GS.RowWrapper>
  );
};

export default InputBody;
