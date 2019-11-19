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

  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleRegisterErrMsg = msg => {
    setErrorMsg({ ...errors, register: msg });
  };

  const signUp = async () => {
    try {
      const { id, password, name, email } = values;
      const body = { user_id: id, password, sub_email: email, name };
      await axios.post('/users', body);
      Router.push('/login');
    } catch (err) {
      const message = errorParser(err);
      handleRegisterErrMsg(message);
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    if (validateForm()) {
      const id = values.id.trim();
      signUp(id, values.password);
    }
  };

  const validateForm = () => {
    const errMsgs = { id: '', password: '', name: '', email: '' };
    Object.keys(errMsgs).forEach(key => {
      errMsgs[key] = validator.validateAndGetMsg(key, values[key], true);
    });
    errMsgs.checkPassword = '';
    if (values.password !== values.checkPassword) {
      errMsgs.checkPassword = ERROR_DIFFERENT_PASSWORD;
    }
    setErrorMsg(errMsgs);
    return Object.keys(errMsgs).every(key => errMsgs[key] === '');
  };

  return (
    <S.InputForm>
      <S.InputContainer>
        <S.Title>Daitnu 계정 만들기</S.Title>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="outlined-search"
          label="이름"
          type="search"
          value={values.name}
          onChange={handleInputChange('name')}
          className={classes.textField}
          error={errors.name !== ''}
          margin="normal"
          variant="outlined"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.name}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <OutlinedInput
          id="outlined-adornment-weight"
          label="아이디"
          value={values.id}
          onChange={handleInputChange('id')}
          className={classes.textField}
          error={errors.id !== ''}
          endAdornment={<InputAdornment position="end">@daitnu.com</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.id}</S.ErrorText>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="outlined-password-input"
          label="비밀번호"
          value={values.password}
          onChange={handleInputChange('password')}
          className={classes.textField}
          error={errors.password !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="확인"
          value={values.checkPassword}
          onChange={handleInputChange('checkPassword')}
          className={classes.textField}
          error={errors.checkPassword !== ''}
          type={values.showPassword ? 'text' : 'password'}
          autoComplete="current-password"
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
          value={values.email}
          onChange={handleInputChange('email')}
          className={classes.textField}
          error={errors.email !== ''}
          margin="normal"
          variant="outlined"
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
