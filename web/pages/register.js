import React from 'react';

import RegisterForm from '../components/Forms/RegisterForm';
import RegisterLogo from '../components/RegisterLogo';
import BackButton from '../components/BackButton';

import * as GS from '../components/GlobalStyle';
import HeadTitle from '../components/HeadTitle';

const RegisterPage = () => (
  <GS.FlexRowCenterWrap>
    <HeadTitle title="회원가입" />
    <BackButton />
    <GS.SmallBoard>
      <GS.FlexItem>
        <RegisterForm />
      </GS.FlexItem>
      <GS.FlexItem>
        <RegisterLogo />
      </GS.FlexItem>
    </GS.SmallBoard>
  </GS.FlexRowCenterWrap>
);

export default RegisterPage;
