import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as S from './styled';
import * as WM_S from '../styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { UPDATE_TEXT } from '../ContextProvider/reducer/action-type';

const TUI = dynamic(import('./TUI'), { ssr: false });

const InputBody = () => {
  const { text } = useStateForWM();
  const dispatch = useDispatchForWM();
  const [flag, setFlag] = useState(true);

  const blurHandler = e => {
    dispatch({ type: UPDATE_TEXT, payload: { text: e.target.value } });
    setFlag(!flag);
  };

  const focusHandler = () => {
    setFlag(!flag);
  };

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>내용</WM_S.Label>
      <TUI />
      {/* {flag ? (
        <S.WriteBody onFocus={focusHandler} value={text}></S.WriteBody>
      ) : (
        <S.WriteBody onBlur={blurHandler} defaultValue={text}></S.WriteBody>
      )} */}
    </WM_S.RowWrapper>
  );
};

export default InputBody;
