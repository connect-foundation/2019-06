import React, { useState } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';

const InputBody = () => {
  const { text } = useStateForWM();
  const dispatch = useDispatchForWM();
  const [flag, setFlag] = useState(true);

  const blurHandler = e => {
    dispatch({ type: 'updateText', text: e.target.value });
    setFlag(!flag);
  };

  const focusHandler = () => {
    setFlag(!flag);
  };

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>내용</WM_S.Label>
      {flag ? (
        <S.WriteBody onFocus={focusHandler} value={text}></S.WriteBody>
      ) : (
        <S.WriteBody onBlur={blurHandler} defaultValue={text}></S.WriteBody>
      )}
    </WM_S.RowWrapper>
  );
};

export default InputBody;
