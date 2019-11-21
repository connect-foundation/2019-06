import React from 'react';

import LoginForm from '../components/LoginForm';
import SmallHeader from '../components/SmallHeader';
import LinkArea from '../components/LinkArea';

import * as S from '../components/GlobalStyle';

const LoginPage = () => (
  <S.FlexCenterWrap>
    <SmallHeader />
    <LoginForm />
    <S.HorizontalLine />
    <LinkArea />
  </S.FlexCenterWrap>
);

export default LoginPage;
