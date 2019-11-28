import React from 'react';

import LoginForm from '../components/Forms/LoginForm';
import SmallHeader from '../components/SmallHeader';
import LinkArea from '../components/LinkArea';
import MessageHeader from '../components/MessageHeader';

import * as S from '../components/GlobalStyle';

const LoginPage = () => (
  <S.FlexCenterWrap>
    <MessageHeader></MessageHeader>
    <SmallHeader />
    <LoginForm />
    <S.HorizontalLine />
    <LinkArea />
  </S.FlexCenterWrap>
);

export default LoginPage;
