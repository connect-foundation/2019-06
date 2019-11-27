import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import S from './styled';
import LogoutButton from '../LogoutButton';
import storage from '../../utils/storage';

const initialValuState = {
  name: '',
  sub_email: '',
  loading: true,
};

const Profile = () => {
  const [values, setValues] = useState(initialValuState);
  const router = useRouter();

  useEffect(() => {
    const user = storage.getUser();
    if (!user) {
      router.push('/login');
    }

    const { name, sub_email } = user;
    setValues({
      name,
      email: sub_email,
      loading: false,
    });
  }, []);

  const { name, email, loading } = values;

  return !loading ? (
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
            <Button style={{ textTransform: 'none' }}>{name}</Button>
          </S.ColumnItem>
          <S.ColumnItem>
            <Button onClick={() => router.push('/profile/pwchange')}>********</Button>
          </S.ColumnItem>
          <S.ColumnItem>
            <Button style={{ textTransform: 'none' }}>{email}</Button>
          </S.ColumnItem>
        </S.ColumnContainer>
      </S.UserDataContainer>
      <S.AlignRightContainer>
        <LogoutButton />
      </S.AlignRightContainer>
    </S.Container>
  ) : (
    <></>
  );
};
export default Profile;
