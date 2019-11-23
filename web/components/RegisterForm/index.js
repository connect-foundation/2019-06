import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { TextField, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import validator from '../../utils/validator';
import { errorParser } from '../../utils/error-parser';
import { ERROR_DIFFERENT_PASSWORD } from '../../utils/error-message';
import S from './styled';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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

const RegisterForm = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState(initialInputState);
  const [errors, setErrorMsg] = React.useState(initialErrorState);

  const handleInputChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleRegisterErrMsg = msg => {
    setErrorMsg({ ...initialErrorState, register: msg });
  };

  const signUp = async () => {
    try {
      const { id, password, name, email } = values;
      const body = { id, password, sub_email: email, name: name.trim() };
      await axios.post('/users', body);
      Router.push('/login');
    } catch (err) {
      const message = errorParser(err);
      handleRegisterErrMsg(message);
    }
  };

  const onSubmitHandler = e => {
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
          id="outlined-search"
          label="이름"
          type="search"
          onBlur={handleInputChange('name')}
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
          id="outlined-adornment-weight"
          label="아이디"
          onBlur={handleInputChange('id')}
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
          id="outlined-password-input"
          label="비밀번호"
          onBlur={handleInputChange('password')}
          className={classes.textField}
          error={errors.password !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="확인"
          onBlur={handleInputChange('checkPassword')}
          className={classes.textField}
          error={errors.checkPassword !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
          {values.showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.password || errors.checkPassword}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="outlined-search"
          label="이메일"
          type="search"
          onBlur={handleInputChange('email')}
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
      <S.Button className="submit-btn max-width" onClick={onSubmitHandler}>
        가입하기
      </S.Button>
    </S.InputForm>
  );
};
export default RegisterForm;
