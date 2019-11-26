import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import validator from '../../../utils/validator';
import { errorParser } from '../../../utils/error-parser';
import { ERROR_DIFFERENT_PASSWORD } from '../../../utils/error-message';
import S from './styled';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
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

const PasswordModal = () => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState(initialInputState);
  const [errors, setErrorMsg] = useState(initialErrorState);

  const handleInputChange = prop => ({ target }) => {
    setValues({ ...values, [prop]: target.value });
  };

  const handleChangeErrMsg = msg => {
    setErrorMsg({ ...initialErrorState, register: msg });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  const updatePassword = async () => {
    try {
      const { password } = values;
      const body = { password };
      await axios.patch('/users/password', body);
      handleOpen();
    } catch (err) {
      const message = errorParser(err);
      handleChangeErrMsg(message);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (validateForm()) {
      updatePassword();
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
    <S.InputForm autoComplete="off">
      <S.InputContainer>
        <S.Title>비밀번호 변경</S.Title>
      </S.InputContainer>
      <S.InputContainer>
        <TextField
          id="passwrd"
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
          id="checkPassword"
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
        <S.WhiteButton className="submit-btn max-width" onClick={() => router.back()}>
          취소
        </S.WhiteButton>
        <S.Button className="submit-btn max-width" onClick={onSubmitHandler}>
          확인
        </S.Button>
      </S.ButtonContainer>

      <Dialog open={open} aria-labelledby="draggable-dialog-title">
        <DialogTitle id="draggable-dialog-title">알림</DialogTitle>
        <DialogContent>
          <DialogContentText>비밀번호 변경을 완료하였습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </S.InputForm>
  );
};
export default PasswordModal;
