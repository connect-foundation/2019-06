import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import S from './styled';
import PasswordModal from '../PasswordModal';

const initialUserState = {
  name: '이정환',
  password: '12345678',
  email: 'ljhw3377@gmail.com',
};

const Profile = () => {
  const [values, setValues] = React.useState(initialUserState);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name, password, email } = values;

  return (
    <S.Container>
      <S.ColumnContainer>
        <S.Title>프로필</S.Title>
        <S.Text>{email}</S.Text>
      </S.ColumnContainer>
      <S.UserDataContainer>
        <S.ColumnContainer>
          <S.ColumnItem>
            <S.Text>이름</S.Text>
          </S.ColumnItem>
          <S.ColumnItem>
            <S.Text>비밀번호</S.Text>
          </S.ColumnItem>
          <S.ColumnItem>
            <S.Text>이메일</S.Text>
          </S.ColumnItem>
        </S.ColumnContainer>
        <S.ColumnContainer>
          <S.ColumnItem>
            <Button>{name}</Button>
          </S.ColumnItem>
          <S.ColumnItem>
            <Button onClick={handleOpen}>********</Button>
          </S.ColumnItem>
          <S.ColumnItem>
            <Button style={{ 'text-transform': 'none' }}>{email}</Button>
          </S.ColumnItem>
        </S.ColumnContainer>
      </S.UserDataContainer>
      <PasswordModal open={open} handleClose={handleClose}></PasswordModal>
    </S.Container>
  );
};
export default Profile;
