import React from 'react';

import S from './styled';
import logo from '../../../assets/imgs/logo.png';

const Header = () => {
  return (
    <S.Header>
      <S.Logo src={logo} />
      <S.Title>Daitne</S.Title>
    </S.Header>
  );
};
export default Header;
