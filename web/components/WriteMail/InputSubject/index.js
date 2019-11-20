import React, { useState } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { UPDATE_SUBJECT } from '../ContextProvider/reducer/action-type';

const InputSubject = () => {
  const { subject } = useStateForWM();
  const dispatch = useDispatchForWM();

  const [flag, setFlag] = useState(true);

  const blurHandler = e => {
    dispatch({ type: UPDATE_SUBJECT, payload: { subject: e.target.value } });
    setFlag(!flag);
  };

  const focusHandler = _ => {
    setFlag(!flag);
  };

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>제목</WM_S.Label>
      {flag ? (
        <S.InputSubject maxLength={50} onFocus={focusHandler} value={subject} />
      ) : (
        <S.InputSubject maxLength={50} onBlur={blurHandler} defaultValue={subject} />
      )}
    </WM_S.RowWrapper>
  );
};

export default InputSubject;
