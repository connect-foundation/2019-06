import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SmallHeader from '../../SmallHeader';
import validator from '../../../utils/validator';
import S from './styled';
import { AppDispatchContext } from '../../../contexts';
import { SUCCESS_EMAIL_SEND_TO_FIND_ID } from '../../../utils/success-message';
import { setMessage } from '../../../contexts/reducer';
import request from '../../../utils/request';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const FindIdForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useContext(AppDispatchContext);

  const findIdByEmail = async () => {
    const body = { email };
    const { isError, data } = await request.post('/users/search?type=id', body);
    if (isError) {
      setError(data.message);
    } else {
      dispatch(setMessage(SUCCESS_EMAIL_SEND_TO_FIND_ID));
      Router.push('/login');
    }
  };

  const handleSubmitClick = e => {
    e.preventDefault();

    if (validateForm()) {
      findIdByEmail();
    }
  };

  const validateForm = () => {
    const errMsg = validator.validateAndGetMsg('email', email);
    setError(errMsg);

    return errMsg === '';
  };

  return (
    <S.InputForm>
      <S.InputContainer>
        <SmallHeader />
      </S.InputContainer>
      <S.InputContainer>
        <S.Title>아이디 찾기</S.Title>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="outlined-search"
          label="이메일"
          type="search"
          onChange={({ target: { value } }) => setEmail(value)}
          onBlur={validateForm}
          className={classes.textField}
          error={error !== ''}
          margin="normal"
          variant="outlined"
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.ErrorText>{error}</S.ErrorText>
      </S.InputContainer>
      <S.Button className="submit-btn max-width" onClick={handleSubmitClick}>
        확인
      </S.Button>
    </S.InputForm>
  );
};
export default FindIdForm;
