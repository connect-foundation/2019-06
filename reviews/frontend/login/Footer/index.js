import React from 'react';
import Link from 'next/link';

import S from './styled';

const Footer = () => (
  <S.Footer>
    <Link href="help/id">
      <S.A>아이디 찾기</S.A>
    </Link>
    <Link href="held/password">
      <S.A>비밀번호 찾기</S.A>
    </Link>
    <Link href="register">
      <S.A>회원가입</S.A>
    </Link>
  </S.Footer>
);

export default Footer;
