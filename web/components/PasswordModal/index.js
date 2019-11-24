import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { TextField, Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import validator from '../../utils/validator';
import { errorParser } from '../../utils/error-parser';
import { ERROR_DIFFERENT_PASSWORD } from '../../utils/error-message';
import S from './styled';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initialInputState = {
  password: '',
  checkPassword: '',
};

const initialErrorState = {
  password: '',
  checkPassword: '',
  change: '',
};

const PasswordModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  const [values, setValues] = React.useState(initialInputState);
  const [errors, setErrorMsg] = React.useState(initialErrorState);

  const handleInputChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
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
    const errMsgs = { password: '' };
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
    <div className={classes.root} ref={rootRef}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <S.InputForm autoComplete="off">
              <S.InputContainer>
                <S.Title>비밀번호 변경</S.Title>
              </S.InputContainer>
              <S.InputContainer>
                <TextField
                  id="standard-basic"
                  label="비밀번호 입력"
                  type="password"
                  onChange={handleInputChange('password')}
                  className={classes.textField}
                  error={errors.password !== ''}
                  margin="normal"
                  autoComplete="off"
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.ErrorText>{errors.password}</S.ErrorText>
              </S.InputContainer>
              <S.InputContainer>
                <TextField
                  id="standard-basic"
                  label="비밀번호 재입력"
                  type="password"
                  onChange={handleInputChange('checkPassword')}
                  className={classes.textField}
                  error={errors.checkPassword !== ''}
                  margin="normal"
                  autoComplete="off"
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.ErrorText>{errors.checkPassword || errors.change}</S.ErrorText>
              </S.InputContainer>
              <S.ButtonContainer>
                <S.WhiteButton className="submit-btn max-width" onClick={handleClose}>
                  취소
                </S.WhiteButton>
                <S.Button className="submit-btn max-width" onClick={onSubmitHandler}>
                  확인
                </S.Button>
              </S.ButtonContainer>
            </S.InputForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default PasswordModal;
