import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SmallHeader from '../SmallHeader';
import validator from '../../utils/validator';
import { errorParser } from '../../utils/error-parser';
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
  id: '',
  email: '',
};

const initialErrorState = {
  id: '',
  email: '',
  search: '',
};

const FindPwForm = () => {
  const classes = useStyles();

  const [values, setValues] = useState(initialInputState);
  const [errors, setErrorMsg] = useState(initialErrorState);

  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const setSearchErrMsg = msg => {
    setErrorMsg({ ...initialErrorState, search: msg });
  };

  const findPasswordByIdAndEmail = async () => {
    try {
      const body = { id: values.id, email: values.email };
      await axios.post('/users/search?type=pw', body);
      Router.push('/login');
    } catch (err) {
      const message = errorParser(err);
      setSearchErrMsg(message);
    }
  };

  const handleSubmitClick = e => {
    e.preventDefault();

    if (validateForm()) {
      findPasswordByIdAndEmail();
    }
  };

  const validateForm = () => {
    const errMsgs = { id: '', email: '' };
    Object.keys(errMsgs).forEach(key => {
      errMsgs[key] = validator.validateAndGetMsg(key, values[key]);
    });

    setErrorMsg(errMsgs);

    return Object.keys(errMsgs).every(key => errMsgs[key] === '');
  };

  return (
    <S.InputForm>
      <S.InputContainer>
        <SmallHeader />
      </S.InputContainer>
      <S.InputContainer>
        <S.Title>비밀번호 찾기</S.Title>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="outlined-search"
          label="아이디"
          type="search"
          onBlur={handleInputChange('id')}
          className={classes.textField}
          error={errors.id !== ''}
          margin="normal"
          variant="outlined"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.id}</S.ErrorText>
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
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{errors.email || errors.search}</S.ErrorText>
      </S.InputContainer>
      <S.Button className="submit-btn max-width" onClick={handleSubmitClick}>
        확인
      </S.Button>
    </S.InputForm>
  );
};
export default FindPwForm;
