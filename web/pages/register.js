import React from 'react';

import RegisterForm from '../components/RegisterForm';
import RegisterLogo from '../components/RegisterLogo';

import * as S from '../components/GlobalStyle';

const RegisterPage = () => (
  <S.FlexRowCenterWrap>
    <S.SmallBoard>
      <S.FlexItem>
        <RegisterForm />
      </S.FlexItem>
      <S.FlexItem>
        <RegisterLogo />
      </S.FlexItem>
    </S.SmallBoard>
  </S.FlexRowCenterWrap>
);

export default RegisterPage;
