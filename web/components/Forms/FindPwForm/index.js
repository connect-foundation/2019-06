import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SmallHeader from '../../SmallHeader';
import validator from '../../../utils/validator';
import S from './styled';
import { AppDispatchContext } from '../../../contexts';
import { SUCCESS_EMAIL_SEND_TO_FIND_PASSWORD } from '../../../utils/success-message';
import { setMessage } from '../../../contexts/reducer';
import request from '../../../utils/request';

const useStyles = makeStyles(theme => ({
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

  const { dispatch } = useContext(AppDispatchContext);

  const handleInputChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
  };

  const setSearchErrMsg = msg => {
    setErrorMsg({ ...initialErrorState, search: msg });
  };

  const findPasswordByIdAndEmail = async () => {
    const body = { id: values.id, email: values.email };
    const { isError, data } = await request.post('/users/search?type=pw', body);
    if (isError) {
      setSearchErrMsg(data.message);
    } else {
      dispatch(setMessage(SUCCESS_EMAIL_SEND_TO_FIND_PASSWORD));
      Router.push('/login');
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
          onChange={handleInputChange('id')}
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
          onChange={handleInputChange('email')}
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
