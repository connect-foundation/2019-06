import React from 'react';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

import S from './styled';
import LogoutButton from '../LogoutButton';

const Profile = ({ name, sub_email, email }) => {
  return (
    <S.Container>
      <S.ColumnContainer>
        <S.Title>프로필</S.Title>
        <S.EmailText>{email}</S.EmailText>
      </S.ColumnContainer>
      <S.UserDataContainer>
        <S.RowContainer>
          <S.DescText>이름</S.DescText>
          <S.ItemContainer style={{ textTransform: 'none' }}>
            <S.Text>{name}</S.Text>
          </S.ItemContainer>
        </S.RowContainer>
        <S.RowContainer>
          <S.DescText>비밀번호</S.DescText>
          <S.ItemContainer>
            <S.Text>********</S.Text>
            <Button variant="outlined" onClick={() => Router.push('/profile/pwchange')}>
              변경
            </Button>
          </S.ItemContainer>
        </S.RowContainer>
        <S.RowContainer>
          <S.DescText>이메일</S.DescText>
          <S.ItemContainer style={{ textTransform: 'none' }}>
            <S.Text>{sub_email}</S.Text>
          </S.ItemContainer>
        </S.RowContainer>
      </S.UserDataContainer>
      <S.AlignRightContainer>
        <LogoutButton />
      </S.AlignRightContainer>
    </S.Container>
  );
};
export default Profile;
