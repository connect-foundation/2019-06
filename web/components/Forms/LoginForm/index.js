import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import useForm from 'react-hook-form';

import {
  ERROR_ID_EMPTY,
  ERROR_PASSWORD_EMPTY,
  ERROR_ID_VALIDATION,
  ERROR_PASSWORD_VALIDATION,
} from '../../../utils/error-message';
import validator from '../../../utils/validator';
import { errorParser } from '../../../utils/error-parser';
import S from './styled';

const LoignForm = () => {
  const { register, handleSubmit, errors, setError, clearError } = useForm();

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
      setError('userId', 'validate', ERROR_ID_VALIDATION);
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
    try {
      const body = { id, password };
      const { data } = await axios.post('/auth/login', body);

      window.sessionStorage.setItem('user', JSON.stringify(data));

      Router.push('/');
    } catch (err) {
      const message = errorParser(err);
      setError('login', 'api', message);
    }
  };

  return (
    <S.InputForm onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        type="text"
        className="form-control"
        id="userId"
        placeholder="아이디"
        name="userId"
        ref={register}
      />
      <S.ErrorText>{errors.userId && errors.userId.message}</S.ErrorText>
      <S.Input
        type="password"
        className="form-control"
        id="password"
        placeholder="비밀번호"
        name="password"
        ref={register}
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
