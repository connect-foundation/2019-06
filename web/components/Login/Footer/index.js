import React from 'react';
import Link from 'next/link';

import S from './styled';

const Footer = () => (
  <S.Footer>
    <Link href="help/id">
      <S.TextLink>아이디 찾기</S.TextLink>
    </Link>
    <Link href="held/password">
      <S.TextLink>비밀번호 찾기</S.TextLink>
    </Link>
    <Link href="register">
      <S.TextLink>회원가입</S.TextLink>
    </Link>
  </S.Footer>
);

export default Footer;
