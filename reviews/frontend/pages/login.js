import React from 'react';

import Form from '../components/login/Form';
import Header from '../components/login/Header';
import Footer from '../components/login/Footer';

import * as S from '../components/login/styled';

const LoginPage = () => (
  <S.FlexWrap>
    <Header />
    <Form />
    <S.HR />
    <Footer />
  </S.FlexWrap>
);

export default LoginPage;
