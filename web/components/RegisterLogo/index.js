import React from 'react';
import * as S from './styled';

import logo from '../../assets/imgs/logo.png';

const RegisterLogo = () => {
  return (
    <>
      <S.Logo src={logo} />
      <S.DescText>하나의 계정으로 모든 Daitnu 서비스를 이용할 수 있습니다.</S.DescText>
    </>
  );
};

export default RegisterLogo;
