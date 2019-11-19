import React, { useContext } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import { WriteMailContext } from '../ContextProvider';

const InputBody = () => {
  const { bodyComponent } = useContext(WriteMailContext);

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>내용</WM_S.Label>
      <S.WriteBody ref={bodyComponent} contentEditable={true} />
    </WM_S.RowWrapper>
  );
};

export default InputBody;
