import React from 'react';

import LoginForm from '../components/Forms/LoginForm';
import SmallHeader from '../components/SmallHeader';
import LinkArea from '../components/LinkArea';
import MessageHeader from '../components/MessageHeader';

import * as S from '../components/GlobalStyle';
import HeadTitle from '../components/HeadTitle';

const LoginPage = () => (
  <S.FlexCenterWrap>
    <HeadTitle title="로그인" />
    <MessageHeader />
    <SmallHeader />
    <LoginForm />
    <S.HorizontalLine />
    <LinkArea />
  </S.FlexCenterWrap>
);

export default LoginPage;
