import React from 'react';
import Link from 'next/link';

import S from './styled';
import logo from '../../assets/imgs/logo.png';

const SmallHeader = () => {
  return (
    <Link href="/">
      <S.Brand>
        <S.Logo src={logo} />
        <S.Title>Daitne</S.Title>
      </S.Brand>
    </Link>
  );
};
export default SmallHeader;
