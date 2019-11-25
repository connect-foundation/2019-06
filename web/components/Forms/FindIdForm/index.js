import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SmallHeader from '../../SmallHeader';
import validator from '../../../utils/validator';
import { errorParser } from '../../../utils/error-parser';
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

const FindIdForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const findIdByEmail = async () => {
    try {
      const body = { email };
      await axios.post('/users/search?type=id', body);
      Router.push('/login');
    } catch (err) {
      const message = errorParser(err);
      setError(message);
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
          onBlur={({ target: { value } }) => setEmail(value)}
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
