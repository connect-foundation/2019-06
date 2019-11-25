/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import * as S from './styled';
import ProfileLink from '../ProfileLink';
import { AppContext } from '../../contexts';
import { setSelected } from '../../contexts/reducer';

const Header = ({ brand }) => {
  const { dispatch } = useContext(AppContext);
  const handleAtagClick = () => dispatch(setSelected(null));
  return (
    <S.Header>
      <S.Brand>
        <S.Center>
          <S.Atag onClick={handleAtagClick}>{brand}</S.Atag>
        </S.Center>
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
