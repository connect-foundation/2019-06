/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import * as S from './styled';

import ProfileLink from '../ProfileLink';
import { AppDispatchContext } from '../../contexts';
import { handleCategoryClick } from '../../contexts/reducer';
import MailArea from '../MailArea';
import logo from '../../public/logo.png';

const Header = ({ brand }) => {
  const { dispatch } = useContext(AppDispatchContext);
  const handleLogoClick = () => dispatch(handleCategoryClick(0, <MailArea />));
  return (
    <S.Header>
      <S.Brand>
        <S.Logo src={logo} onClick={handleLogoClick} alt={'로고이미지'} />
      </S.Brand>
      <S.Search>
        <button>검색</button>
        <S.SearchInput placeholder="메일 검색" type="text" />
        <button>필터</button>
      </S.Search>
      <ProfileLink />
    </S.Header>
  );
};

export default Header;
