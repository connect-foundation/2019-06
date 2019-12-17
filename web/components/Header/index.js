/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as S from './styled';
import ProfileLink from '../ProfileLink';
import logo from '../../public/logo.png';
import Search from './Search';
import { changeUrlWithoutRunning } from '../../utils/url/change-query';

const Header = () => {
  const handleLogoClick = () => changeUrlWithoutRunning({});
  return (
    <S.Header>
      <S.Brand>
        <S.Logo src={logo} onClick={handleLogoClick} alt={'로고이미지'} />
      </S.Brand>
      <S.Search>
        <Search />
      </S.Search>
      <ProfileLink />
    </S.Header>
  );
};

export default Header;
