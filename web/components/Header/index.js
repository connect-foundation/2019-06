/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import * as S from './styled';

const Header = ({ brand }) => (
  <S.Header>
    <S.Brand>
      <S.Center>
        <Link href="/">
          <S.Atag>{brand}</S.Atag>
        </Link>
      </S.Center>
    </S.Brand>
    <S.Search>
      <button>검색</button>
      <S.SearchInput placeholder="메일 검색" type="text" />
      <button>필터</button>
    </S.Search>
  </S.Header>
);

export default Header;
