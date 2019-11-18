import React from 'react';

import Form from '../components/Form';
import SmallHeader from '../components/SmallHeader';
import LinkArea from '../components/LinkArea';

import * as S from '../components/GlobalStyle';

const LoginPage = () => (
  <S.FlexCenterWrap>
    <SmallHeader />
    <Form />
    <S.HorizontalLine />
    <LinkArea />
  </S.FlexCenterWrap>
);

export default LoginPage;
