import React, { useState, useReducer } from 'react';
import Router from 'next/router';
import axios from 'axios';

import {
  ERROR_ID_EMPTY,
  ERROR_PASSWORD_EMPTY,
  ERROR_ID_VALIDATION,
  ERROR_PASSWORD_VALIDATION,
} from '../../utils/error-message';
import { initialState, errorReducer } from './reducers';
import { RESET, SET_ID_ERROR_MSG, SET_PASSWORD_ERROR_MSG, SET_LOGIN_ERROR_MSG } from './actions';
import validator from '../../utils/validator';
import { errorParser } from '../../utils/error-parser';
import S from './styled';

const LoignForm = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMsg, dispatchErrorMsg] = useReducer(errorReducer, initialState);

  const signIn = async (id, password) => {
    try {
      const body = { id, password };
      const { data } = await axios.post('/auth/login', body);

      window.sessionStorage.setItem('user', JSON.stringify(data));

      Router.push('/');
    } catch (err) {
      const message = errorParser(err);
      dispatchErrorMsg({ type: SET_LOGIN_ERROR_MSG, payload: message });
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    const id = userId.trim();

    dispatchErrorMsg({ type: RESET });
    if (validateForm(id, userPassword)) {
      signIn(id, userPassword);
    }
  };

  const validateForm = (id, password) => {
    if (id.length === 0) {
      dispatchErrorMsg({ type: SET_ID_ERROR_MSG, payload: ERROR_ID_EMPTY });
      return false;
    }

    if (!validator.validate('id', id)) {
      dispatchErrorMsg({ type: SET_ID_ERROR_MSG, payload: ERROR_ID_VALIDATION });
      return false;
    }

    if (password.length === 0) {
      dispatchErrorMsg({ type: SET_PASSWORD_ERROR_MSG, payload: ERROR_PASSWORD_EMPTY });
      return false;
    }

    if (!validator.validate('password', password)) {
      dispatchErrorMsg({ type: SET_PASSWORD_ERROR_MSG, payload: ERROR_PASSWORD_VALIDATION });
      return false;
    }
    return true;
  };

  const { idErrorMsg, passwordErrorMsg, loginErrorMsg } = errorMsg;

  return (
    <S.InputForm>
      <S.Input
        type="text"
        className="form-control"
        id="userId"
        placeholder="아이디"
        value={userId}
        name="userId"
        onChange={({ target: { value } }) => setUserId(value)}
      />
      <S.ErrorText>{idErrorMsg}</S.ErrorText>
      <S.Input
        type="password"
        className="form-control"
        id="password"
        placeholder="비밀번호"
        value={userPassword}
        name="password"
        onChange={({ target: { value } }) => setUserPassword(value)}
      />
      <S.ErrorText>{passwordErrorMsg || loginErrorMsg}</S.ErrorText>
      <S.Button className="submit-btn max-width" onClick={onSubmitHandler}>
        로그인
      </S.Button>
    </S.InputForm>
  );
};
export default LoignForm;
