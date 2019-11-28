import React, { useContext } from 'react';
import Router from 'next/router';
import useForm from 'react-hook-form';

import {
  ERROR_ID_EMPTY,
  ERROR_PASSWORD_EMPTY,
  ERROR_ID_VALIDATION,
  ERROR_PASSWORD_VALIDATION,
} from '../../../utils/error-message';
import validator from '../../../utils/validator';
import S from './styled';
import storage from '../../../utils/storage';
import request from '../../../utils/request';
import { setMessage } from '../../../contexts/reducer';
import { AppDisapthContext } from '../../../contexts';

const LoignForm = () => {
  const { register, handleSubmit, errors, setError, clearError } = useForm();
  const { dispatch } = useContext(AppDisapthContext);

  const handleRouteChange = url => {
    if (url !== '/login') {
      dispatch(setMessage(''));
    }
  };

  Router.events.on('routeChangeStart', handleRouteChange);

  const onSubmit = (data, e) => {
    const { userId, password } = data;

    e.preventDefault();

    if (validateForm(userId, password)) {
      signIn(userId, password);
    }
  };

  const validateForm = (id, password) => {
    let checkId;
    let checkPassword;

    if (id.length === 0) {
      setError('userId', 'notMatch', ERROR_ID_EMPTY);
    } else if (!validator.validate('id', id)) {
      setError('userId', 'validation', ERROR_ID_VALIDATION);
    } else {
      clearError('userId');
      checkId = true;
    }

    if (password.length === 0) {
      setError('password', 'notMatch', ERROR_PASSWORD_EMPTY);
    } else if (!validator.validate('password', password)) {
      setError('password', 'validation', ERROR_PASSWORD_VALIDATION);
    } else {
      clearError('password');
      checkPassword = true;
    }

    return checkId && checkPassword;
  };

  const signIn = async (id, password) => {
    const body = { id, password };
    const { isError, data } = await request.post('/auth/login', body);
    if (isError) {
      setError('login', 'api', data.message);
      return;
    }
    storage.setUser(data);
    Router.push('/');
  };

  return (
    <S.InputForm onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        type="text"
        className="form-control"
        id="userId"
        placeholder="아이디"
        name="userId"
        maxLength={20}
        ref={register}
        autoComplete="off"
      />
      <S.ErrorText>{errors.userId && errors.userId.message}</S.ErrorText>
      <S.Input
        type="password"
        className="form-control"
        id="password"
        placeholder="비밀번호"
        name="password"
        maxLength={20}
        ref={register}
        autoComplete="off"
      />
      <S.ErrorText>
        {(errors.password && errors.password.message) || (errors.login && errors.login.message)}
      </S.ErrorText>
      <S.Button className="submit-btn max-width" onSubmit={handleSubmit(onSubmit)}>
        로그인
      </S.Button>
    </S.InputForm>
  );
};
export default LoignForm;
