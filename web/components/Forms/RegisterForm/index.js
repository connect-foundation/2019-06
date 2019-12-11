import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { TextField, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import validator from '../../../utils/validator';
import {
  ERROR_DIFFERENT_PASSWORD,
  ERROR_ID_AND_SUB_EMAIL_DUPLICATION,
  ERROR_ID_DUPLICATION,
  ERROR_SUB_EMAIL_DUPLICATION,
} from '../../../utils/error-message';
import { SUCCESS_REGISTER } from '../../../utils/success-message';
import S from './styled';
import request from '../../../utils/request';
import { setMessage } from '../../../contexts/reducer';
import { AppDispatchContext } from '../../../contexts';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const initialInputState = {
  name: '',
  id: '',
  password: '',
  checkPassword: '',
  email: '',
  showPassword: false,
};

const initialErrorState = {
  name: '',
  id: '',
  password: '',
  email: '',
  checkPassword: '',
  register: '',
};

const registerErrorMessageParser = errorMsg => {
  const errorMsgs = {};

  if (errorMsg === ERROR_ID_AND_SUB_EMAIL_DUPLICATION) {
    errorMsgs.id = ERROR_ID_DUPLICATION;
    errorMsgs.email = ERROR_SUB_EMAIL_DUPLICATION;
  } else if (errorMsg === ERROR_ID_DUPLICATION) {
    errorMsgs.id = ERROR_ID_DUPLICATION;
  } else if (errorMsg === ERROR_SUB_EMAIL_DUPLICATION) {
    errorMsgs.email = ERROR_SUB_EMAIL_DUPLICATION;
  } else {
    errorMsgs.register = errorMsg;
  }

  return errorMsgs;
};

const RegisterForm = () => {
  const classes = useStyles();
  const { dispatch } = useContext(AppDispatchContext);

  const [values, setValues] = useState(initialInputState);
  const [errors, setErrorMsg] = useState(initialErrorState);

  const handleInputChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
  };

  const handleInputBlur = prop => () => {
    if (prop !== 'checkPassword') {
      const errMsg = validator.validateAndGetMsg(prop, values[prop], true);
      setErrorMsg({ ...errors, [prop]: errMsg });
    } else if (values.password !== values.checkPassword) {
      setErrorMsg({ ...errors, [prop]: ERROR_DIFFERENT_PASSWORD });
    } else {
      setErrorMsg({ ...errors, [prop]: '' });
    }
  };

  const handlePasswordInputBlur = () => {
    const errMsgs = { password: '', checkPassword: '' };

    errMsgs.password = validator.validateAndGetMsg('password', values.password, true);
    if (
      validator.validateCheckPassword(values.password, values.checkPassword, errors.checkPassword)
    ) {
      errMsgs.checkPassword = ERROR_DIFFERENT_PASSWORD;
    }

    setErrorMsg({ ...errors, ...errMsgs });
  };

  const handlePasswordShowClick = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const signUp = async () => {
    const { id, password, name, email } = values;
    const body = { id, password, sub_email: email, name: name.trim() };
    const { isError, data } = await request.post('/users', body);
    if (isError) {
      const { message } = data;
      const errMsgs = registerErrorMessageParser(message);
      setErrorMsg({ ...errors, ...errMsgs });
      return;
    }
    dispatch(setMessage(SUCCESS_REGISTER));
    Router.push('/login');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      signUp();
    }
  };

  const validateForm = () => {
    const errMsgs = { id: '', password: '', name: '', email: '' };
    const userForm = { ...values, name: values.name.trim() };
    Object.keys(errMsgs).forEach(key => {
      errMsgs[key] = validator.validateAndGetMsg(key, userForm[key], true);
    });
    errMsgs.checkPassword = '';
    if (values.password !== values.checkPassword) {
      errMsgs.checkPassword = ERROR_DIFFERENT_PASSWORD;
    }
    setErrorMsg(errMsgs);
    return Object.keys(errMsgs).every(key => errMsgs[key] === '');
  };

  return (
    <S.InputForm autoComplete="off">
      <S.InputContainer>
        <S.Title>Daitnu 계정 만들기</S.Title>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="name"
          label="이름"
          type="search"
          onChange={handleInputChange('name')}
          onBlur={handleInputBlur('name')}
          className={classes.textField}
          error={errors.name !== ''}
          margin="normal"
          variant="outlined"
          autoComplete="off"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.name}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <OutlinedInput
          id="id"
          label="아이디"
          onChange={handleInputChange('id')}
          onBlur={handleInputBlur('id')}
          className={classes.textField}
          error={errors.id !== ''}
          endAdornment={<InputAdornment position="end">@daitnu.com</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
          autoComplete="off"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.id}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="password"
          label="비밀번호"
          onChange={handleInputChange('password')}
          onBlur={handlePasswordInputBlur}
          className={classes.textField}
          error={errors.password !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="checkPassword"
          label="확인"
          onChange={handleInputChange('checkPassword')}
          onBlur={handleInputBlur('checkPassword')}
          className={classes.textField}
          error={errors.checkPassword !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <IconButton aria-label="toggle password visibility" onClick={handlePasswordShowClick}>
          {values.showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.password || errors.checkPassword}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="email"
          label="이메일"
          type="search"
          onChange={handleInputChange('email')}
          onBlur={handleInputBlur('email')}
          className={classes.textField}
          error={errors.email !== ''}
          margin="normal"
          variant="outlined"
          autoComplete="off"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.register || errors.email}</S.ErrorText>
      </S.InputContainer>
      <S.Button onClick={handleSubmit}>가입하기</S.Button>
    </S.InputForm>
  );
};
export default RegisterForm;
