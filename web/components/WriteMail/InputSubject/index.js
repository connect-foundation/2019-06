import React, { useState, useEffect } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import { useDispatchForWM, useStateForWM } from '../ContextProvider';
import { UPDATE_SUBJECT } from '../ContextProvider/reducer/action-type';

const InputSubject = ({ defaultSubject }) => {
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

  useEffect(() => {
    dispatch({
      type: UPDATE_SUBJECT,
      payload: { subject: defaultSubject ? `Re: ${defaultSubject}` : '' },
    });
  }, []);

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
