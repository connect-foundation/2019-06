import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

import S from './styled';
import PasswordModal from '../PasswordModal';
import LogoutButton from '../LogoutButton';

const initialValuState = {
  name: '',
  sub_email: '',
  loading: false,
};

const Profile = () => {
  const [values, setValues] = React.useState(initialValuState);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const userStr = window.sessionStorage.getItem('user');
    if (!userStr) {
      Router.push('/login');
    }

    const { name, sub_email } = JSON.parse(userStr);
    setValues({
      name,
      email: sub_email,
      loading: true,
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name, email, loading } = values;

  return loading ? (
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
            <Button style={{ textTransform: 'none' }}>{email}</Button>
          </S.ColumnItem>
        </S.ColumnContainer>
      </S.UserDataContainer>
      <S.AlignRightContainer>
        <LogoutButton />
      </S.AlignRightContainer>
      <PasswordModal open={open} handleClose={handleClose}></PasswordModal>
    </S.Container>
  ) : (
    <></>
  );
};
export default Profile;
